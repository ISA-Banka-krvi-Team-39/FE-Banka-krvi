import { PersonType } from '../user/PersonType';
import { PersonGender } from '../user/PersonGender';
import { Address } from "../shared/Address";


export class PatientDto {
    personId?:number;
    patientId:number;
    termId:number;
    name:string;
    surname:string;

    constructor(id:number,patientId: number,termId:number,name:string,surname:string) {
      this.personId = id;
      this.patientId = patientId;
      this.termId = termId;
      this.name = name;
      this.surname = surname;
      
    }
  }