import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionService } from 'src/app/services/session.service';
import { Router } from '@angular/router';
import { InterviewService } from 'src/app/services/interview.service';
import { tap, switchMap } from 'rxjs/operators';
import { PromotionService } from 'src/app/services/promotion.service';

@Component({
  selector: 'app-session-form',
  templateUrl: './session-form.component.html',
  styleUrls: ['./session-form.component.css']
})
export class SessionFormComponent implements OnInit {

  sessionForm: FormGroup;

  interviews: Survey[];

  promotions: Category[];

  constructor(private fb: FormBuilder,
    private sessionService: SessionService,
    private promotionService: PromotionService,
    private router: Router, private interviewService: InterviewService) {
    this.sessionForm = fb.group({
      name: ['', [Validators.required]],
      survey: ['', [Validators.required]],
      promotion: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.interviewService.getAll()
      .pipe(tap(interviews => this.interviews = interviews))
      .subscribe();

    this.promotionService.getAll()
      .pipe(tap(promotions => this.promotions = promotions))
      .subscribe();
  }

  submit() {
    const session = {
      surveyId: {
        id: this.sessionForm.get('survey').value
      }
    } as Session;
    this.sessionService.save(session)
      .pipe(
        switchMap(response => {
          const location = response.headers.get('location');
          console.log(location);
          return this.sessionService.addCategory(
            +location.substr(8),
            +(this.sessionForm.get('promotion').value));
        })
      )
      .subscribe(
        () =>
          this.router.navigate(['/session'])
      );
  }

}
