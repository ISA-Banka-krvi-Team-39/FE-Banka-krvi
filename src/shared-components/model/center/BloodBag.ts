import { BloodType } from "./BloodType";

export class BloodBag {
  
    amount:string;
    bloodType:BloodType;

    constructor(amount:string,bloodType:BloodType) {
      this.amount = amount;
      this.bloodType = bloodType;
    }
  }