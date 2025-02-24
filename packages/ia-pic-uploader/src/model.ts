/**
 * Defines the possible actions that can be performed in the service
 */
export type ActionType = 'save-file' | 'verify-upload';

/**
 * Defines the valid file types that can be processed
 */
export type ValidFileType = 'image/jpeg' | 'image/png' | 'image/gif';

/**
 * Defines the valid display types
 */
export type ValidType = 'full' | 'compact';

/**
 * Interface for service operation options
 * @interface ServiceOptionType
 * @property {ActionType} action - The action to be performed
 * @property {string} [method] - The HTTP method to use
 * @property {string} identifier - Unique identifier for the operation
 * @property {File | null} [file] - File to be processed
 * @property {string} [getParam] - URL parameter for GET requests
 * @property {string} endpoint - API endpoint URL
 * @property {Record<string, string>} [headers] - HTTP headers
 * @property {function} [callback] - Callback function to handle the response
 */
export interface ServiceOptionType {
  action: ActionType;
  method?: string;
  identifier: string;
  file?: File | null;
  getParam?: string;
  endpoint: string;
  headers?: Record<string, string>;
  callback?: (response: Response) => void;
}
