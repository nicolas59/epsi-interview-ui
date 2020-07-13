import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { InterviewService } from 'src/app/services/interview.service';
import { ActivatedRoute } from '@angular/router';
import { map, tap, switchMap } from 'rxjs/operators';
import { SessionService } from 'src/app/services/session.service';
import { ToastrService } from 'ngx-toastr';

enum State {
  INIT = 'INIT',
  PENDING = 'PENDING',
  END = 'END',
  EXPIRED = 'EXPIRED'
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
    private sessionSerrvice: SessionService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.activeRoute.params
      .pipe(
        tap(params => this.uuid = params['uuid'] as string),
        tap(params => this.sessionId = params['sessionId'] as string),
        switchMap(params => this.sessionSerrvice.getSession(this.sessionId, this.uuid)))
      .subscribe(
        (exam) => {
          switch (exam.status) {
            case 'PENDING':
              this.initForm(exam);
              break;
            case 'END':
              this.state = State.END;
              break;
            case 'EXPIRED':
              this.state = State.EXPIRED;
              break;
          }
        }
      );
  }

  private initForm(exam: Exam) {
    this.questions = exam.questions;
    this.currentNum = 1;

    if (exam.lastQuestionAnswered) {
      const index = this.questions.reduce((acc, q, currentIndex) => {
        if (q.id === exam.lastQuestionAnswered.id) {
          acc = currentIndex;
        }
        return acc;
      }, 0);
      this.currentNum = index + 2;
      this.currentQuestion = this.questions[index + 1];
    } else {
      this.currentNum = 1;
      this.currentQuestion = this.questions[0];
    }
    this.state = State.PENDING;
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
        (error) => this.toastr.error('Erreur lors de la sauvegade de la reponse')
      );
  }
}
