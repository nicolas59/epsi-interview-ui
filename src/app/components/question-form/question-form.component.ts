import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormArray } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { tap, switchMap } from "rxjs/operators";
import { InterviewService } from "src/app/services/interview.service";
import { empty } from "rxjs";

@Component({
  selector: "app-question-form",
  templateUrl: "./question-form.component.html",
  styleUrls: ["./question-form.component.css"]
})
export class QuestionFormComponent implements OnInit {
  question?: Question;

  questionGroup: FormGroup;

  surveyId: string;
  questionId?: string;

  constructor(private fb: FormBuilder, private router: Router, private activeRoute: ActivatedRoute, private interviewService: InterviewService) {
    this.questionGroup = fb.group({
      label: ["", []],
      response: ["", []],
      score: [1, []],
      multiple: [false, []],
      items: fb.array([this.createItem()])
    });
  }

  get items() {
    return this.questionGroup.get("items") as FormArray;
  }

  private createItem() {
    return this.fb.group({
      label: ["", []],
      reference: ["", []]
    });
  }

  addItem() {
    (this.questionGroup.controls["items"] as FormArray).push(this.createItem());
  }

  save() {
    this.question = {} as Question;
    this.question.label = this.questionGroup.controls["label"].value;
    this.question.response = this.questionGroup.controls["response"].value;

    this.question.score = this.questionGroup.controls["score"].value;
    this.question.multiple = this.questionGroup.controls["multiple"].value;
    const array = this.questionGroup.controls["items"] as FormArray;
    const items = array.controls.map((value, index) => ({
      order: index,
      label: value.get("label").value,
      reference: value.get("reference").value
    }));
    this.question.items = items;

    this.interviewService.addQuestion(this.surveyId, this.question).subscribe(() => this.router.navigate(["/interview", this.surveyId]));
  }

  annuler() {
    this.router.navigate(["/interview", this.surveyId]);
  }

  ngOnInit() {
    this.activeRoute.params
      .pipe(
        tap(params => (this.surveyId = params["surveyId"] as string)),
        tap(params => (this.questionId = params["questionId"] as string)),
        switchMap(param => {
          if (this.questionId) {
            return this.interviewService.getQuestion(this.surveyId, this.questionId);
          } else {
            return empty();
          }
        })
      )
      .subscribe(data => {
        if (data) {
          const question = data as Question;
          this.questionGroup.patchValue({
            label: question.label,
            multiple: question.multiple
          });

          const items = question.items.map(item =>
            this.fb.group({
              label: [item.label, []],
              reference: [item.reference, []]
            })
          );

          this.questionGroup.controls["items"] = this.fb.array(items);
        }
      });
  }
}
