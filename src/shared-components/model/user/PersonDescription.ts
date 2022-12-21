
export class PersonDescription {
    antibiotics:boolean;
    infections:boolean;
    kilograms:string;
    month_period:boolean;
    pressure:boolean;
    sick:boolean;
    tatoo:boolean;
    tooth:boolean;

    constructor(antibiotics: boolean,infections:boolean,kilograms:string,tatoo:boolean,
        month_period:boolean,sick:boolean,pressure:boolean,tooth:boolean) {
      this.antibiotics = antibiotics;
      this.infections = infections;
      this.kilograms = kilograms;
      this.month_period = month_period;
      this.pressure = pressure;
      this.sick = sick;
      this.tatoo = tatoo;
      this.tooth = tooth;
    }
  }