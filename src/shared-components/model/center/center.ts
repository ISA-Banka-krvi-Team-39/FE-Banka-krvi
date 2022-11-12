import { Address } from "../shared/Address";

import { MedicalStaff } from "../shared/MedicalStaff";

export class Center {
    address:Address;
    name:string;
    description:string;
    avgGrade:number;
    workingMedicalStaff:MedicalStaff[];


    constructor(address: Address,name:string,description:string,avgGrade:number,persons:MedicalStaff[]) {
      this.address = address;
      this.name = name;
      this.description = description;
      this.avgGrade = avgGrade;
      this.workingMedicalStaff = persons;
    }
}