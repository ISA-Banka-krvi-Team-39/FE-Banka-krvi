import { PersonType } from '../user/PersonType';
import { Address } from "../shared/Address";


export class PersonDTO {
    address:Address;
    name:string;
    surname:string;
    phoneNumber:string;
    password:string;
    school:string;
    personType:PersonType;

    constructor(address: Address,name:string,surname:string,
      password:string,school:string,phoneNumber:string,personType:PersonType) {
      this.address = address;
      this.name = name;
      this.surname = surname;
      this.password = password;
      this.school = school;
      this.phoneNumber = phoneNumber;
      this.personType = personType;
    }
  }