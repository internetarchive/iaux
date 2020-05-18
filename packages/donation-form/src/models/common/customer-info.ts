export class CustomerInfo {
  email: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;

  constructor(params: {
    email: string | undefined,
    firstName: string | undefined,
    lastName: string | undefined
  }) {
    this.email = params.email;
    this.firstName = params.firstName;
    this.lastName = params.lastName;
  }
}
