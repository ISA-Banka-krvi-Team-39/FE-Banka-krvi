export class WastedMaterialStatsDTO {
    wastedNeedlesMonthly:number;
    wastedBagsMonthly:number;
    wastedNeedles3Months:number;
    wastedBags3Months:number;
    wastedNeedlesYearly:number;
    wastedBagsYearly:number;


    constructor(wastedNeedlesMonthly:number,wastedBagsMonthly:number,wastedNeedles3Months:number,
        wastedBags3Months:number,wastedNeedlesYearly:number,wastedBagsYearly:number) {
      this.wastedNeedlesMonthly = wastedNeedlesMonthly;
      this.wastedBagsMonthly = wastedBagsMonthly;
      this.wastedNeedles3Months = wastedNeedles3Months;
      this.wastedBags3Months = wastedBags3Months;
      this.wastedNeedlesYearly = wastedNeedlesYearly;
      this.wastedBagsYearly = wastedBagsYearly;
    }
}