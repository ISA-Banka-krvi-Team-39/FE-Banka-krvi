import { LocalDate, LocalDateTime } from "js-joda";

export class TermByDate {
    name:string;
    city:string;
    avgGrade:number;
    id:number;

    constructor(name:string,city:string,avgGrade:number,termId:number,id:number) {
      this.name = name;
      this.city = city;
      this.avgGrade = avgGrade;
      this.id = id;
    }
  }