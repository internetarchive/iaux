 export enum BundleType {
  Module = 'module',
  NoModule = 'nomodule'
}

export interface LazyLoaderServiceInterface {
  loadBundle(bundle: {
    module?: string,
    nomodule?: string
  }): Promise<void>;

  loadScript(options: {
    src: string,
    bundleType?: BundleType,
    attributes?: { key: string, value: any }[]
  }): Promise<void>;
}

 export class LazyLoaderService {
  private container: HTMLElement;

  constructor(
    container: HTMLElement = document.head
  ) {
    this.container = container;
  }

  loadBundle(bundle: {
    module?: string,
    nomodule?: string
  }) {
    let modulePromise: Promise<Event> | undefined;
    let nomodulePromise: Promise<Event> | undefined;

    if (bundle.module) {
      modulePromise = this.loadScript({
        src: bundle.module,
        bundleType: BundleType.Module
      });
    }

    if (bundle.nomodule) {
      nomodulePromise = this.loadScript({
        src: bundle.nomodule,
        bundleType: BundleType.NoModule
      });
    }

    return Promise.race([modulePromise, nomodulePromise]);
  }

  loadScript(options: {
    src: string,
    bundleType?: BundleType,
    attributes?: { key: string, value: any }[]
  }): Promise<Event> {
    const scriptSelector = `script[src='${options.src}'][async]`;
    let script: HTMLScriptElement = this.container.querySelector(scriptSelector) as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script') as HTMLScriptElement;
      script.setAttribute('src', options.src);
      script.async = true;

      options.attributes?.forEach(element => {
        script?.setAttribute(element.key, element.value)
      });

      switch (options.bundleType) {
        case BundleType.Module:
          script.setAttribute('type', options.bundleType);;
        case BundleType.NoModule:
          script.setAttribute(options.bundleType, '');
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
