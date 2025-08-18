import log from './log';

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

  let finalResponse = {};
  let baseHost = '';
  const location = window?.location;
  if (location?.pathname === '/demo/') {
    baseHost = `/demo/`;
  } else {
    baseHost = option.endpoint;
  }

  const requestOptions: RequestInit = {
    method: option.method,
    headers: option.headers,
    credentials: 'include',
  };

  if (option.action === 'save-file') {
    if (option.file) {
      const formData = new FormData();
      formData.append('file', option.file);
      requestOptions.body = formData;
    }
    requestOptions.credentials = 'include';
  }

  try {
    await fetch(baseHost, requestOptions)
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

        if (option.action === 'save-file' && response.status === 200) {
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
  }
  return finalResponse;
}
