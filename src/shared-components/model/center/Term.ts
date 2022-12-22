import { PatientUser } from "../PatientUser/PatientUser";
import { Center } from "./center";


export class Term {
    termId?:number;
    dateTime:string;
    durationInMinutes:string;
    bloodDonor:PatientUser
    center:Center;
    state:string;

    constructor(id:number,dateTime:string,duration:string,center:Center,bloodDonor:PatientUser,state:string) {
      this.termId = id;
      this.dateTime = dateTime;
      this.durationInMinutes = duration;
      this.center = center;
      this.bloodDonor = bloodDonor;
      this.state = state;
    }
  }