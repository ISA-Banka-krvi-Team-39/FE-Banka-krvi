export class TermForPatDto {
    patientId:number;
    termId:number;

    constructor(patientId:number,termId:number) {
      this.patientId = patientId;
      this.termId = termId;
      
    }
  }