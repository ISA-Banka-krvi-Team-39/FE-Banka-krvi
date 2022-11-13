export class Address {

    country: string;
    city: string;
    streetName: string;
    streetNumber: string;

    constructor(country:string,city:string,streetName:string,streetNumber:string) {
      this.country = country;
      this.city = city;
      this.streetName = streetName;
      this.streetNumber = streetNumber;
    }
  }