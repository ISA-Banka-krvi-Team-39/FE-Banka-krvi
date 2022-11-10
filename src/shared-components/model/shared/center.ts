import { Address } from "./address";

export class Center {
    address:Address;
    name:string;
    description:string;
    avg_grade:number;

    constructor(address: Address,name:string,description:string,email:string,password:string,school:string,uuid:number,avg_grade:number) {
      this.address = address;
      this.name = name;
      this.description = description;
      this.avg_grade = avg_grade;
    }
  }