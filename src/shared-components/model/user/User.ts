import { PersonType } from './PersonType';
import { PersonGender } from './PersonGender';
import { Address } from "../shared/Address";


export class User {
    address:Address;
    name:string;
    surname:string;
    email:string;
    phoneNumber:string;
    uuid:string;
    password:string;
    school:string;
    personGender:PersonGender;
    personType:PersonType;

    constructor(address: Address,name:string,surname:string,email:string,
      password:string,school:string,uuid:string,phoneNumber:string,personGender:PersonGender,personType:PersonType) {
      this.address = address;
      this.name = name;
      this.surname = surname;
      this.password = password;
      this.uuid = uuid;
      this.school = school;
      this.email = email;
      this.phoneNumber = phoneNumber;
      this.personGender = personGender;
      this.personType = personType;
    }
  }