import { Center } from "./center";


export class Term {
    dateTime:string;
    duration:string;
    center:Center;

    constructor(dateTime:string,duration:string,center:Center) {
      this.dateTime = dateTime;
      this.duration = duration;
      this.center = center;
    }
  }