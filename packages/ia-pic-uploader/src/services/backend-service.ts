import log from './log';
import { ServiceOptionType } from '../model';

/**
 * Helper to call loan service
 * @param {Object} options
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function BackendServiceHandler(options: any): Promise<any> {
  const option = {
    action: null,
    identifier: '',
    file: null,
    getParam: '',
    endpoint: '',
    headers: {},
    callback() {},
    ...options,
  };

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
      mode: 'no-cors', // Add this line
      headers: option.headers,
      body: option.file ?? null,
    })
      .then(response => {
        log('response', response);

        /**
         * return success response for /demo/ server...
         */
        if (baseHost === '/demo/' && option.action === 'verify-upload') {
          return {
            success: true,
            item_last_updated: 1,
          };
        }

    if (option.action === 'save-file') {
      if (response.status === 200) {
        log(
          'file saved, metadata call started to verify if image is upadated!'
        );
        if (option.callback) {
          option.callback(response);
          return {};
        }

        /**
         * The response is a Response instance.
         * You parse the data into a useable format using `.json()`
         */
        if (response.status !== 0) {
          return response.json();
        }
      })
      .then(data => {
        if (option.action === 'save-file') {
          log(
            'file saved, metadata call started to verify is picture is updated!',
          );
        }

        finalResponse = data;
      });
  } catch (error) {
    log(error);
    return {};
  }
}
