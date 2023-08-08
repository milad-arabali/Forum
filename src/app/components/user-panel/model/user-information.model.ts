export class UserInformationModel {
  id:number;
  userName: string;
  password: any;
  name: string;
  nameFamily: string;
  nationalCode: number;
  gender: string;
  DateOfBirth: Date;

  constructor(id:number, username: string, password: any, name: string, nameFamily: string, nationalCode: number, gender: string, DateOfBirth: Date) {
    this.id= id;
    this.userName = username;
    this.password = password;
    this.name = name;
    this.nameFamily = nameFamily;
    this.nationalCode = nationalCode;
    this.gender = gender;
    this.DateOfBirth = DateOfBirth;
  }
}
