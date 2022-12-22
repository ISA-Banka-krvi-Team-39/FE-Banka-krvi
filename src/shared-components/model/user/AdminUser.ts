
import { User } from './User';

export class AdminUser {
    adminId:number;
    person:User;
    wasLoggedIn:boolean;

    constructor(adminId:number,person:User,wasLoggedIn:boolean) {
      this.adminId = adminId;
      this.person = person;
      this.wasLoggedIn = wasLoggedIn;
    }
  }