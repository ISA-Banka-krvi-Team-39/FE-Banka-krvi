import { Address } from "../shared/Address";
import { PersonDTO } from "../shared/Person";


export class Center {
    address:Address;
    name:string;
    description:string;
    avgGrade:string;
    workingMedicalStaff:PersonDTO[];


    constructor(address: Address,name:string,description:string,avgGrade:string,persons:PersonDTO[]) {
      this.address = address;
      this.name = name;
      this.description = description;
      this.avgGrade = avgGrade;
      this.workingMedicalStaff = persons;
    }
  }