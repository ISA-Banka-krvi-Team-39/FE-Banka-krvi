import { Answer } from "./Answer";

export class QuestionnaireClass {
    public patientId:number;
    public answers:Answer[];

    constructor(patientId:number,answers:Answer[]) {
      this.patientId = patientId;
      this.answers = answers;
    }
  }