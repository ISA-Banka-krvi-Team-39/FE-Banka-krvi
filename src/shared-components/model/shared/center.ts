import { Address } from "../shared/Address";
import { PersonDTO } from "../shared/Person";

export class Center {
    address:Address;
    name:string;
    description:string;
    avg_grade:string;
    workingMedicalStaff:PersonDTO[];


    constructor(address: Address,name:string,description:string,avg_grade:string,persons:PersonDTO[]) {
      this.address = address;
      this.name = name;
      this.description = description;
      this.avg_grade = avg_grade;
      this.workingMedicalStaff = persons;
    }
  }