import { Component, OnInit, Input, OnChanges, EventEmitter, Output } from "@angular/core";
import { importType } from "@angular/compiler/src/output/output_ast";

interface SelectState {
  item: Item;
  state: boolean;
}

@Component({
  selector: "app-question",
  templateUrl: "./question.component.html",
  styleUrls: ["./question.component.css"]
})
export class QuestionComponent implements OnInit {
  _question: Question;

  @Input()
  num?: number;

  @Input()
  visualisation = false;

  @Input()
  randomItem = false;

  selectedResponse?: Item;

  multipleSelectedResponses = Array<SelectState>();

  @Output()
  nextStep = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  @Input()
  set question(question: Question) {
    if (question) {
      if (this.randomItem) {
        this._question = JSON.parse(JSON.stringify(question));
        const random = localStorage.getItem(String(question.id))
          ? +localStorage.getItem(String(question.id))
          : this.getRandomInt(this._question.items.length);
        localStorage.setItem(String(question.id), String(random));

        const itemSize = this._question.items.length;
        const items = this._question.items.reduce((acc, item, index) => {
          acc[(index + random) % itemSize] = item;
          return acc;
        }, Array<Item>());

        this._question.items = items;
      } else {
        this._question = question;
        this.selectedResponse = null;
      }
      if (question.multiple) {
        this.multipleSelectedResponses = question.items.map(it => ({ item: it, state: false }));
      }
    }
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  get question() {
    return this._question;
  }

  goToNextStep() {
    if (this._question.multiple) {
      this.nextStep.emit(
        this.multipleSelectedResponses
          .filter(it => it.state)
          .map(it => it.item.reference)
          .join(",")
      );
    } else {
      this.nextStep.emit(this.selectedResponse.reference);
    }
  }

  get isNextButtonEnabled() {
    return this.selectedResponse !== null || this.multipleSelectedResponses.filter(it => it.state).length > 0;
  }
}
