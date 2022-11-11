import { Address } from "../shared/Address";

export class Center{
    address: Address;
    name: string;
    description: string;
    avg_grade: number;
    
    constructor(address: Address, name: string, description: string, avg_grade: number){
        this.address = address;
        this.name = name;
        this.description = description;
        this.avg_grade = avg_grade

    }

}