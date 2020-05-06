export class CustomerResponse {
  email: string;
  firstName: string;
  lastName: string;

  constructor(params: any) {
    this.email = params.email;
    this.firstName = params.firstName;
    this.lastName = params.lastName;
  }
}
