import { Component, OnInit } from '@angular/core';
import { InterviewService } from 'src/app/services/interview.service';
import { switchMap, map, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-interview-detail',
  templateUrl: './interview-detail.component.html',
  styleUrls: ['./interview-detail.component.css']
})
export class InterviewDetailComponent implements OnInit {

  displayedColumns: string[] = ['id', 'label'];

  survey?: Survey;
  questions?: Question[];

  question: Question;

  constructor(private interviewService: InterviewService,
    private activeRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activeRoute.params.pipe(
      map(params => params['id'] as number),
      switchMap(id => this.interviewService.findById(id)),
      tap(survey => this.survey = survey),
      tap(survey => this.questions = survey.questions))
      .subscribe();
  }

  showQuestion(question: Question) {
    this.question = question;
  }

  editerQuestion() {
    this.router.navigate(['/question-form', this.survey.id, 'question', this.question.id]);
  }

  ajouteQuestion() {
    this.router.navigate(['/question-form', this.survey.id]);
  }
}
