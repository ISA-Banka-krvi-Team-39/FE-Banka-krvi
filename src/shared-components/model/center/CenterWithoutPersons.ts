import { Address } from "../shared/Address";

export class CenterWithoutPersons {
    public address:Address;
    public name:string;
    public description:string;
    public avg_grade:string;
    static address: any;
    static avg_grade: string;
    static description: string;

    constructor(address: Address,name:string,description:string,avg_grade:string) {
      this.address = address;
      this.name = name;
      this.description = description;
      this.avg_grade = avg_grade;
    }
  }