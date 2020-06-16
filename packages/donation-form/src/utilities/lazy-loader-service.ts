export interface LazyLoaderServiceInterface {
  loadBundle(bundle: { module?: string, nomodule?: string }): Promise<void>;
  loadScript(src: string): Promise<void>;
}

export enum BundleType {
  Module = 'module',
  NoModule = 'nomodule'
}

export class LazyLoaderService {
  private container: HTMLElement;

  constructor(
    container = document.head
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
      modulePromise = this.loadScript(bundle.module, BundleType.Module);
    }
    if (bundle.nomodule) {
      nomodulePromise = this.loadScript(bundle.nomodule, BundleType.NoModule);
    }

    return Promise.race([modulePromise, nomodulePromise]);
  }

  loadScript(src: string, bundleType?: BundleType, attributes?: {key: string, value: any}[]): Promise<Event> {
    let script: HTMLScriptElement = this.container.querySelector(`script[src='${src}'][async]`) as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script') as HTMLScriptElement;
      script.setAttribute('src', src);
      script.async = true;

      attributes?.forEach(element => {
        script.setAttribute(element.key, element.value)
      });
      // script.setAttribute('async', 'true');

      switch (bundleType) {
        case BundleType.Module:
          script.setAttribute('type', bundleType);;
        case BundleType.NoModule:
          script.setAttribute(bundleType, '');
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
