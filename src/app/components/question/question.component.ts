import { Component, OnInit, Input, OnChanges, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  @Input()
  question: Question;

  @Input()
  num?: number;

  selectedResponse?: string;

  @Output()
  nextStep = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  goToNextStep() {
    console.log(this.selectedResponse);
    this.nextStep.emit();
  }

}
