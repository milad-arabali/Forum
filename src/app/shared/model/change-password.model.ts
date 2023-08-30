export class UserDbModel {
  password: any;
  currentPassword: any;


  constructor(password:number, currentPassword: string) {
    this.password= password;
    this.currentPassword = currentPassword;

  }
}
