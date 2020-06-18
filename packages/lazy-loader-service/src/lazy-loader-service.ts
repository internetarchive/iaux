export enum BundleType {
  Module = 'module',
  NoModule = 'nomodule'
}

export interface LazyLoaderServiceInterface {
  /**
   * Load a javascript bundle (module and nomodule pair)
   *
   * eg:
   *
   * lazyLoaderService.loadBundle({
   *   module: 'https://my-server.com/module.js',
   *   nomodule: 'https://my-server.com/no-module.js'
   * });
   *
   * @param bundle
   */
  loadBundle(bundle: {
    module?: string;
    nomodule?: string;
  }): Promise<Event | undefined>;

  /**
   * Load a script with a Promise
   *
   * eg.
   *
   * lazyLoaderService.loadScript({
   *   src: 'https://my-server.com/script.js'
   * });
   *
   *
   * @param options
   */
  loadScript(options: {
    src: string;
    bundleType?: BundleType;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    attributes?: { key: string; value: any }[];
  }): Promise<Event>;
}

export class LazyLoaderService {
  private container: HTMLElement;

  constructor(
    container: HTMLElement = document.head
  ) {
    this.container = container;
  }

  /** @inheritdoc */
  loadBundle(bundle: {
    module?: string;
    nomodule?: string;
  }): Promise<Event | undefined> {
    let modulePromise: Promise<Event> | undefined;
    let nomodulePromise: Promise<Event> | undefined;

    /* istanbul ignore else */
    if (bundle.module) {
      modulePromise = this.loadScript({
        src: bundle.module,
        bundleType: BundleType.Module
      });
    }

    /* istanbul ignore else */
    if (bundle.nomodule) {
      nomodulePromise = this.loadScript({
        src: bundle.nomodule,
        bundleType: BundleType.NoModule
      });
    }

    return Promise.race([modulePromise, nomodulePromise]);
  }

  /** @inheritdoc */
  loadScript(options: {
    src: string;
    bundleType?: BundleType;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    attributes?: { key: string; value: any }[];
  }): Promise<Event> {
    const scriptSelector = `script[src='${options.src}'][async]`;
    let script = this.container.querySelector(scriptSelector) as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script') as HTMLScriptElement;
      script.setAttribute('src', options.src);
      script.async = true;

      const attributes = options.attributes ?? [];

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      attributes.forEach((element: any) => {
        // eslint-disable-next-line no-unused-expressions
        script.setAttribute(element.key, element.value);
      });

      switch (options.bundleType) {
        case BundleType.Module:
          script.setAttribute('type', options.bundleType);
          break;
        /* istanbul ignore next */ // cannot be tested because modern browsers ignore `nomodule`
        case BundleType.NoModule:
          script.setAttribute(options.bundleType, '');
          break;
        default:
          break;
      }
    }

    return new Promise((resolve, reject) => {
      script.onload = (e) => {
        script.setAttribute('dynamicImportLoaded', 'true');
        resolve(e);
      };

      script.onerror = (e) => {
        /* istanbul ignore else */
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
        reject(e);
      };

      if (script.parentNode === null) {
        this.container.appendChild(script);
      } else if (script.getAttribute('dynamicImportLoaded')) {
        resolve();
      }
    });
  }
}
