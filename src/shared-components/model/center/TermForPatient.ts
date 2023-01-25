import { PatientUser } from "../PatientUser/PatientUser";
import { Center } from "./center";
import { State } from "./State";
import 'rxjs/Rx';

export class TermForPatient {
    termId:number;
    dateTime:string;
    durationInMinutes:string;
    bloodDonor:PatientUser
    center:Center;
    state:State;

    constructor(id:number,dateTime:string,duration:string,center:Center,bloodDonor:PatientUser,state:State) {
      this.termId = id;
      this.dateTime = dateTime;
      this.durationInMinutes = duration;
      this.center = center;
      this.bloodDonor = bloodDonor;
      this.state = state;
    }
  }