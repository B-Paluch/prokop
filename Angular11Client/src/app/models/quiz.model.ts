export class Quiz {
  id?: any;
  name?: string;
  questions?:Questions[];
}

export class Questions{
  title?: String;
  alternatives?: any;
  questiontype? : String;
  id?:any;
}

export class QuestionOption{
  text?:String;
  isCorrect?:Boolean;
}
