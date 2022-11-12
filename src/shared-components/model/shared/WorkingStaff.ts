import { PersonGender } from "../user/PersonGender";
import { PersonType } from "../user/PersonType";
import { Address } from "./Address";

export class WorkingStaff{
    personId:number;
    name:string;
    surname:string;
    personType:PersonType;
    address:Address;
    phoneNumber:string;
    school:string;
    


    constructor(personId:number,address: Address,name:string,surname:string,
        school:string,phoneNumber:string,personType:PersonType) {
        this.personId = personId;
        this.address = address;
        this.name = name;
        this.surname = surname;
        this.school = school;
        this.phoneNumber = phoneNumber;
        this.personType = personType;
      }

}