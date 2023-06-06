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
  console.log(option);

  let finalResponse = {};
  let baseHost = `${option.endpoint}?${option.getParam}`;

  const location = window?.location;
  if (location?.pathname === '/demo/') baseHost = `/demo/`;

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

        if (option.action === 'save-file' && response.status === 200) {
          console.log('option.callback(response)');
          option.callback(response);
        }

        // if (option.action === 'verify-upload') {
        //   return { status: true, msg: 'verified successfully' };
        // }

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
