import { ResponseValueInterface } from './response-value';
import { SuccessResponse } from './success-models/success-response';
import { ErrorResponse } from './error-models/error-response';

export class DonationResponse {
  success: boolean;
  value: ResponseValueInterface;

  /**
   * Creates an instance of DonationResponse.
   * @param {success: boolean, value: ResponseValue} params
   * @memberof DonationResponse
   */
  constructor(params: any) {
    this.success = params.success;

    // cast the response based on the `success` value
    if (this.success) {
      this.value = new SuccessResponse(params.value);
    } else {
      this.value = new ErrorResponse(params.value);
    }
  }
}
