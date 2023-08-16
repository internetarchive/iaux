/* eslint-disable */

import log from './log';

/**
 * Helper to call loan service
 * @param {Object} options
 */
export async function BackendServiceHandler(options: any) {
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
    baseHost = `${option.endpoint}?${option.getParam}`;
  }

  try {
    await fetch(baseHost, {
      method: 'POST',
      headers: option.headers,
      body: option.file ?? null,
    })
      // eslint-disable-next-line consistent-return
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
            'file saved, metadata call started to verify is picture is upadated!'
          );
        }

        finalResponse = data;
      });
  } catch (error) {
    log(error);
  }
  return finalResponse;
}
