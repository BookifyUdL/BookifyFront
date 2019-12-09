export class User {
  _id: string;
  email: string;
  name: string;

  constructor (values: object = {}) {
    Object.assign(this as any, values);
  }
}
