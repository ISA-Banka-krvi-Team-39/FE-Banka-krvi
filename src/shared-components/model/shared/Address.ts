export class Address {

    country: string;
    city: string;
    streetName: string;
    streetNumber: number;

    constructor(country:string,city:string,streetName:string,streetNumber:number) {
      this.country = country;
      this.city = city;
      this.streetName = streetName;
      this.streetNumber = streetNumber;
    }
  }