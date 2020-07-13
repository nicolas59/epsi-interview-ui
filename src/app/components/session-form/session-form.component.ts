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
  styleUrls: ['./session-form.component.css'],
})
export class SessionFormComponent implements OnInit {
  sessionForm: FormGroup;

  interviews: Survey[];

  promotions: Category[];

  constructor(
    private fb: FormBuilder,
    private sessionService: SessionService,
    private promotionService: PromotionService,
    private router: Router,
    private interviewService: InterviewService
  ) {
    this.sessionForm = fb.group({
      name: ['', [Validators.required]],
      survey: ['', [Validators.required]],
      promotion: ['', [Validators.required]],
      duration: [20, [Validators.required]],
      startDate: [null, [Validators.required]],
    });
  }

  ngOnInit() {
    this.interviewService
      .getAll()
      .pipe(tap((interviews) => (this.interviews = interviews)))
      .subscribe();

    this.promotionService
      .getAll()
      .pipe(tap((promotions) => (this.promotions = promotions)))
      .subscribe();
  }

  submit() {
    const session = {
      name: this.sessionForm.get('name').value,
      duration: this.sessionForm.get('duration').value,
      startDate: this.sessionForm.get('startDate').value,
      surveyId: {
        id: this.sessionForm.get('survey').value,
      },
    } as Session;
    this.sessionService
      .save(session)
      .pipe(
        switchMap((response) => {
          const location = response.headers.get('location');
          return this.sessionService.addCategory(
            +location.substr(location.lastIndexOf('/') + 1),
            +this.sessionForm.get('promotion').value
          );
        })
      )
      .subscribe(() => this.router.navigate(['/session']));
  }
}
