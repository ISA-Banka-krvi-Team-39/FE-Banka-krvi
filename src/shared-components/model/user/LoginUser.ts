export class LoginUser {
    username:string;
    password:string;

    constructor(email: string,password:string){
      this.password = password;
      this.username = email;
    }
  }