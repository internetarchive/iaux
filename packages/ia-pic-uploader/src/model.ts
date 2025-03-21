/**
 * Interface for service operation options
 * @interface ServiceOptionType
 * @property {string} [method] - The HTTP method to use
 * @property {File | null} [file] - File to be processed
 * @property {string} [getParam] - URL parameter for GET requests
 * @property {Record<string, string>} [headers] - HTTP headers
 * @property {function} [callback] - Callback function to handle the response
 * @property {string} endpoint - API endpoint URL
 * @property {string} identifier - Unique identifier for the operation
 * @property {string} action - Action to be performed
 */
export interface ServiceOptionType {
  method?: string;
  file?: File | null;
  getParam?: string;
  headers?: Record<string, string>;
  callback?: (response: Response) => void;
  endpoint?: string;
  action?: 'verify-upload' | 'save-file';
}
