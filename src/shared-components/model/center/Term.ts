import { PatientUser } from "../PatientUser/PatientUser";
import { Center } from "./center";


export class Term {
    termId?:number;
    dateTime:string;
    durationInMinutes:string;
    bloodDonor:PatientUser
    center:Center;

    constructor(id:number,dateTime:string,duration:string,center:Center,bloodDonor:PatientUser) {
      this.termId = id;
      this.dateTime = dateTime;
      this.durationInMinutes = duration;
      this.center = center;
      this.bloodDonor = bloodDonor;
    }
  }