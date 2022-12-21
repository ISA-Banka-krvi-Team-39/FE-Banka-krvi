
export class Info {
    note:string;
    bakarSulfat:string;
    hemoglobin:string;
    lungs:string;
    heart:string;
    bag:string;
    accepted:boolean;
    reason:string;
    startAt:string;
    endAt:string;
    bloodType?:string;

    constructor(note: string,bakarSulfat:string,hemoglobin:string,accepted:boolean,
        lungs:string,bag:string,heart:string,reason:string,startAt:string,endAt:string,bloodType:string) {
      this.note = note;
      this.bakarSulfat = bakarSulfat;
      this.hemoglobin = hemoglobin;
      this.lungs = lungs;
      this.heart = heart;
      this.bag = bag;
      this.accepted = accepted;
      this.reason = reason;
      this.startAt = startAt;
      this.endAt = endAt;
      this.bloodType = bloodType;
    }
  }