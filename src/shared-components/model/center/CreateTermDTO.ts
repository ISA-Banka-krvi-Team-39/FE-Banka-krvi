import { LocalDateTime } from 'js-joda';
export class CreateTermDTO {
    dateTime:LocalDateTime;
    medicalStaffId:number;
    durationInMinutes:number;
    centerId:number;

    constructor(medicalStaffId:number,durationInMinutes:number,centerId:number,dateTime:LocalDateTime) {
      this.dateTime = dateTime;
      this.medicalStaffId = medicalStaffId;
      this.durationInMinutes = durationInMinutes;
      this.centerId = centerId;
    }
}
