import { CodedError } from './coded_error.js';
import { ResponseValueInterface } from '../response_value.js';

export class ErrorResponse implements ResponseValueInterface {
  message: string;
  errors: CodedError[];

  /**
   * Creates an instance of ErrorResponse.
   * @param {message: string, errors: BraintreeError[]} params
   * @memberof ErrorResponse
   */
  constructor(params: any) {
    this.message = params.message;

    const { errors = [] } = params;
    this.errors = errors.map((error: any) => new CodedError(error));
  }
}
