/**
 * This a code-message pair for more easily identifying an error.
 */
export class CodedError {
  code: number;
  message: string;

  /**
   * Creates an instance of CodedError.
   * @param {code: int, message: string} params
   * @memberof CodedError
   */
  constructor(params: any) {
    this.code = params.code;
    this.message = params.message;
  }
}
