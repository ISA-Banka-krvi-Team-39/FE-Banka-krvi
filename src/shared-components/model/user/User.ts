import { PersonType } from './PersonType';
import { PersonGender } from './PersonGender';
import { Address } from "../shared/Address";
import { BloodType } from './BloodType';


export class User {
    address:Address;
    name:string;
    surname:string;
    email:string;
    phoneNumber:string;
    uid:string;
    password:string;
    school:string;
    personGender:PersonGender;
    personType:PersonType;
    bloodType?:BloodType;

    constructor(address: Address,name:string,surname:string,email:string,
      password:string,school:string,uid:string,phoneNumber:string,personGender:PersonGender,personType:PersonType,bloodType:BloodType) {
      this.address = address;
      this.name = name;
      this.surname = surname;
      this.password = password;
      this.uid = uid;
      this.school = school;
      this.email = email;
      this.phoneNumber = phoneNumber;
      this.personGender = personGender;
      this.personType = personType;
      this.bloodType = bloodType;
    }
  }