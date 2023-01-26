export class TermsStatsDTO {
    termsInMonth:number;
    termsIn3Months:number;
    termsInYear:number;


    constructor(termsInMonth:number,termsIn3Months:number,termsInYear:number) {
      this.termsInMonth = termsInMonth;
      this.termsIn3Months = termsIn3Months;
      this.termsInYear = termsInYear;
    }
}