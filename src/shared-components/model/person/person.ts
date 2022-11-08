import { Address } from "./address";

export class Person {
    address:Address;
    name:string;
    surname:string;
    email:string;
    phoneNumber:number;
    uuid:number;
    password:string;
    school:string;

    constructor(address: Address,name:string,surname:string,email:string,password:string,school:string,uuid:number,phoneNumber:number) {
      this.address = address;
      this.name = name;
      this.surname = surname;
      this.password = password;
      this.uuid = uuid;
      this.school = school;
      this.email = email;
      this.phoneNumber = phoneNumber;
    }
  }