import { Answer } from "./Answer";

export class QuestionnaireClass {
    public personId:number;
    public answers:Answer[];

    constructor(personId:number,answers:Answer[]) {
      this.personId = personId;
      this.answers = answers;
    }
  }