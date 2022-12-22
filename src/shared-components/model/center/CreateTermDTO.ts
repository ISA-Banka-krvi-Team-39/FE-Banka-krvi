import { LocalDateTime } from 'js-joda';
export class CreateTermDTO {
    dateTime:LocalDateTime;
    medicalStaffId:number;
    durationInMinutes:number;
    managerId:number;

    constructor(medicalStaffId:number,durationInMinutes:number,managerId:number,dateTime:LocalDateTime) {
      this.dateTime = dateTime;
      this.medicalStaffId = medicalStaffId;
      this.durationInMinutes = durationInMinutes;
      this.managerId = managerId;
    }
}
