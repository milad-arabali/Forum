
export class UserDbModel{
  userNumber : string;
  password: any;
  constructor( username:string ,password: any) {
    this.userNumber=username;
    this.password = password;
  }
}
