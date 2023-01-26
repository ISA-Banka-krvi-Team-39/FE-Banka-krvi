import { LocalDateTime } from 'js-joda';
export class CreateTermWithPatientDTO {
    dateTime:LocalDateTime;
    medicalStaffId:number;
    durationInMinutes:number;
    patientId:number;
    centerId:number;

    constructor(medicalStaffId:number,durationInMinutes:number,patientId:number,dateTime:LocalDateTime,centerId:number) {
      this.dateTime = dateTime;
      this.medicalStaffId = medicalStaffId;
      this.durationInMinutes = durationInMinutes;
      this.patientId = patientId;
      this.centerId = centerId;
    }
}
