import log from './log';
import { ServiceOptionType } from '../model';

/**
 * Helper to picture upload service
 * @param {Object} options
 */
export async function BackendServiceHandler(options: any): Promise<any> {
  const option = {
    method: 'POST',
    file: null,
    getParam: '',
    endpoint: '',
    headers: {},
    callback() {},
    ...options,
  } as ServiceOptionType;

  // Only append file to formData if it exists in options
  const formData = new FormData();
  if (option.file) {
    formData.append('file', option.file);
  }

  const isDemo = window.location.pathname.startsWith('/demo/');
  const action = isDemo
    ? `http://localhost/info.php?${option.getParam}`
    : `${option.endpoint}?${option.getParam}`;

  try {
    const response = await fetch(action, {
      method: option.method,
      headers: option.headers,
      body: formData,
    });

    log('response', response);

    /**
     * return success response for /demo/ server...
     */
    if (isDemo && option.action === 'verify-upload') {
      return {
        success: true,
        item_last_updated: 1,
      };
    }

    if (option.action === 'save-file') {
      if (response.status === 200) {
        log('file saved, metadata call started to verify if image is updated!');
        if (option.callback) {
          option.callback(response);
          return {};
        }
      }
    }

    /**
     * The response is a Response instance.
     * You parse the data into a useable format using `.json()`
     */
    if (response.status !== 0) {
      const data = await response.json();

      if (option.action === 'save-file') {
        log(
          'file saved, metadata call started to verify is picture is updated!',
        );
      }

      return data;
    }

    return {};
  } catch (error) {
    log(error);
    return {};
  }
}
