import { Term } from "../center/Term";
import { PersonDTO } from "../shared/Person";

export class AppointmentDTO {
    appointmentId:Number;
    termId:Number;
    personId:Number;
    started:boolean;

    constructor(appointmentId:Number,termId: Number,personId:Number,started:boolean) {
      this.appointmentId = appointmentId;
      this.termId = termId;
      this.personId = personId;
      this.started = started;
    }
  }