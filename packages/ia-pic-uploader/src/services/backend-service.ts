/* eslint-disable */

import log from './log';
import { ServiceOptionType } from '../model';

/**
 * Helper function to handle backend service calls for file uploads and verifications
 * @param {ServiceOptionType} options - Configuration object for the service call
 * @param {string} options.method - HTTP method to use (defaults to POST)
 * @param {File} [options.file] - File to upload (optional)
 * @param {string} options.getParam - Query parameters to append to URL
 * @param {string} options.endpoint - API endpoint URL
 * @param {string} options.action - Action type ('save-file' or 'verify-upload')
 * @param {Object} options.headers - Request headers
 * @param {Function} [options.callback] - Callback function called on successful file upload
 * @returns {Promise<Object>} Response data from the API call
 * @throws {Error} Logs error to console and returns empty object if request fails
 */
export async function BackendServiceHandler(
  options: ServiceOptionType
): Promise<object> {
  const option: ServiceOptionType = {
    method: 'POST',
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
      body: option.action === 'save-file' ? formData : null,
    });

    if (isDemo && option.action === 'verify-upload') {
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
        }
        return {};
      }
    }

    if (response.status === 0) {
      return {};
    }

    return await response.json();
  } catch (error) {
    log(error);
    return {};
  }
}
