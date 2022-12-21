import { PersonType } from '../user/PersonType';
import { PersonGender } from '../user/PersonGender';
import { Address } from "../shared/Address";


export class PatientUser {
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
    points:Number;

    constructor(address: Address,name:string,surname:string,email:string,
      password:string,school:string,uid:string,phoneNumber:string,personGender:PersonGender,personType:PersonType,points:Number) {
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
      this.points = points;
    }
  }