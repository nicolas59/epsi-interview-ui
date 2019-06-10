import { Component, OnInit, Input, OnChanges, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {


  _question: Question;

  @Input()
  num?: number;

  selectedResponse?: string;

  @Output()
  nextStep = new EventEmitter();

  constructor() {
  }

  ngOnInit() {

  }

  @Input()
  set question(question: Question) {
    this._question = question;
    this.selectedResponse = null;
  }

  get question() {
    return this._question;
  }

  goToNextStep() {
    this.nextStep.emit();
  }

}
