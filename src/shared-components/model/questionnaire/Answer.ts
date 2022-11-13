
export class Answer {
    public answer:boolean;
    public questionId:number;
    public question:string;

    constructor(answer:boolean,questionId:number,question:string) {
      this.answer = answer;
      this.questionId = questionId;
      this.question = question;
    }
  }