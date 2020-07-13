interface Identifier<T> {
  id?: T;
}

interface Student extends Identifier<number> {
  name: string;
  firstName: string;
  email: string;
  category: Identifier<number>;
}

interface Category extends Identifier<number> {
  name: string;
}

interface Survey extends Identifier<number> {
  name: string;
  questions?: Question[];
}

interface Question extends Identifier<number> {
  label: string;
  score?: number;
  response?: string;
  multiple?: boolean;
  items?: Item[];
}

interface Item extends Identifier<number> {
  order?: number;
  label: string;
  reference: string;
}

enum ExamStatus {
  PENDING = "PENDING",
  END = "END",
  EXPIRED = "EXPIRED",
}
interface Exam {
  status: ExamStatus;
  questions?: Question[];
  lastQuestionAnswered?: Identifier<number>;
}

interface Session extends Identifier<number> {
  name: string;
  surveyId: Identifier<number>;
  startDate: string;
  startedDate?: string;
  endDate?: string;
  studentIds?: Identifier<number>[];
}

interface Context {
  student: Student;
  uuid: string;
  score: number;
}
