import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { InterviewService } from 'src/app/services/interview.service';
import { ActivatedRoute } from '@angular/router';
import { map, tap, switchMap } from 'rxjs/operators';
import { SessionService } from 'src/app/services/session.service';

enum State {
  INIT = 'INIT',
  PENDING = 'PENDING',
  END = 'END'
}

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {

  questions?: Question[];
  currentQuestion?: Question;
  currentNum?: number;

  state = State.PENDING;
  uuid: string;
  sessionId: string;

  constructor(private surveyService: InterviewService,
    private activeRoute: ActivatedRoute,
    private sessionSerrvice: SessionService) { }

  ngOnInit() {
    this.activeRoute.params
      .pipe(
        tap(params => this.uuid = params['uuid'] as string),
        tap(params => this.sessionId = params['sessionId'] as string),
        switchMap(params => this.sessionSerrvice.getSession(this.sessionId, this.uuid)))
      .subscribe(
        (exam) => {
          if (exam.status !== 'PENDING') {
            this.state = State.END;
          } else {
            this.questions = exam.questions;
            this.currentNum = 1;
            this.currentQuestion = this.questions[0];
            this.state = State.PENDING;
          }
        }
      );
  }

  nextStep(response) {
    this.sessionSerrvice.answer(this.uuid, this.sessionId, this.currentQuestion.id, response)
      .subscribe(
        () => {
          if (this.questions.length === this.currentNum) {
            this.state = State.END;
          } else {
            this.currentQuestion = this.questions[this.currentNum];
            this.currentNum++;
          }
        },
        (error) => console.error(error)
      );
  }

}
