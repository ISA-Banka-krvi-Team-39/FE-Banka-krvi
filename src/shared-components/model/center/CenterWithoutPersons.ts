import { Address } from "../shared/Address";

export class CenterWithoutPersons {
    public address:Address;
    public name:string;
    public description:string;
    public avgGrade:number;
    static address: any;
    static avgGrade: number;
    static description: string;

    constructor(address: Address,name:string,description:string,avgGrade:number) {
      this.address = address;
      this.name = name;
      this.description = description;
      this.avgGrade = avgGrade;
    }
  }