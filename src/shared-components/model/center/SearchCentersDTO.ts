export class CreateCenterDTO {
    centerName:string;
    centerCity:string;


    constructor(centerName:string,centerCity:string) {
      this.centerName = centerName;
      this.centerCity = centerCity;
    }
}