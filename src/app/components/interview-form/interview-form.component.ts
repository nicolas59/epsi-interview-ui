import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PromotionService } from 'src/app/services/promotion.service';
import { InterviewService } from 'src/app/services/interview.service';

@Component({
  selector: 'app-interview-form',
  templateUrl: './interview-form.component.html',
  styleUrls: ['./interview-form.component.css']
})
export class InterviewFormComponent implements OnInit {


  interviewForm: FormGroup;

  constructor(private fb: FormBuilder, private interviewService: InterviewService,
    private router: Router) {
    this.interviewForm = fb.group({
      name: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  submit() {
    const survey = {
      name: this.interviewForm.get('name').value
    } as Survey;
    this.interviewService.save(survey).subscribe(
      () => this.router.navigate(['/interview'])
    );
  }

}
