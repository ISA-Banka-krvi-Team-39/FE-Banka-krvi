

export class PatieDto {
    name:string;
    surname:string;
    patientId:number;
    personId:number;

    constructor(name:string,surname: string,patientId:number,personId:number) {
      this.name = name;
      this.surname = surname;
      this.patientId = patientId;
      this.personId = personId;
      
    }
  }