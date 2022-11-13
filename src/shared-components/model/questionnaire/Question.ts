
export class Question {
    public question:string;
    public questionId:number;
    static question:string;
    static id:number;

    constructor(question:string,questionId:number) {
      this.question = question;
      this.questionId = questionId;
    }
  }