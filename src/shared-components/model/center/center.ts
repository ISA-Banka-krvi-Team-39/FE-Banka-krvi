import { Address } from "../shared/Address";
import { PersonDTO } from "../shared/Person";
import { MedicalStaff } from "../shared/MedicalStaff";


export class Center {
    address:Address;
    name:string;
    description:string;
    avgGrade:string;
    workingMedicalStaff:MedicalStaff[];


    constructor(address: Address,name:string,description:string,avgGrade:string,persons:MedicalStaff[]) {
      this.address = address;
      this.name = name;
      this.description = description;
      this.avgGrade = avgGrade;
      this.workingMedicalStaff = persons;
    }
  }