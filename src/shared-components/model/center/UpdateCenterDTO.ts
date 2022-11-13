import { Address } from "../shared/Address";

import { MedicalStaff } from "../shared/MedicalStaff";

export class UpdateCenterDTO {
    address:Address;
    name:string;
    description:string;
    avgGrade:number;
    workingMedicalStaff:MedicalStaff[];
    scheduledMedicalStaff:MedicalStaff[];


    constructor(address: Address,name:string,description:string,avgGrade:number,persons:MedicalStaff[],scheduledMedicalStaff:MedicalStaff[]) {
      this.address = address;
      this.name = name;
      this.description = description;
      this.avgGrade = avgGrade;
      this.workingMedicalStaff = persons;
      this.scheduledMedicalStaff = scheduledMedicalStaff;
    }
}