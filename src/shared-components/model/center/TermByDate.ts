import { LocalDate, LocalDateTime } from "js-joda";

export class TermByDate {
    name:string;
    city:string;
    avgGrade:number;
    termId:number;
    termDateTime:String;

    constructor(name:string,city:string,avgGrade:number,termId:number,termDateTime:String) {
      this.name = name;
      this.city = city;
      this.avgGrade = avgGrade;
      this.termId = termId;
      this.termDateTime = termDateTime;
    }
  }