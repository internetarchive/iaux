import { ResponseValueInterface } from './response_value';
import { SuccessResponse } from './success_models/success_response';
import { ErrorResponse } from './error_models/error_response';

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
