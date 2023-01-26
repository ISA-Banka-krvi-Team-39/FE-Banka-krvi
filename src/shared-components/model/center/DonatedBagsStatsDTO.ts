export class DonatedBagsStatsDTO {
    donatedBagsMonthly:number;
    donatedBags3Months:number;
    donatedBagsYearly:number;


    constructor(donatedBagsMonthly:number,donatedBags3Months:number,donatedBagsYearly:number) {
      this.donatedBagsMonthly = donatedBagsMonthly;
      this.donatedBags3Months = donatedBags3Months;
      this.donatedBagsYearly = donatedBagsYearly;
    }
}