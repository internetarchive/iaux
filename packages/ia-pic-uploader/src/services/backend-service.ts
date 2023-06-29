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
      mode: 'no-cors',
      method: 'POST',
      headers: option.headers,
      body: option.file ?? null,
    })
      // eslint-disable-next-line consistent-return
      .then(response => {
        console.log('response', response);

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
        console.log('data', data);

        if (option.action === 'save-file') {
          console.log(
            'file saved, metadata call started to verify is picture is upadated!'
          );
        }

        finalResponse = data;
      });
  } catch (error) {
    console.log(error);
  }
  return finalResponse;
}
