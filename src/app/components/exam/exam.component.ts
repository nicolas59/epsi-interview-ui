import { Component, OnInit, Output, EventEmitter } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
    this.currentNum = 1;
    this.currentQuestion = {
      label: `Avec JPA, au niveau de la definition d\'un collection,
      il est possible d\'utiliser le type de chargement lazy,
      que permet ce mode?

\`\`\`java
@OneToMany
List<Client> clients;
\`\`\`
      `,
      items: [
        { reference: 'R1', order: 1, label: 'Charger la liste uniquement lorsque celle-ci est accéder par l\'application' },
        { reference: 'R2', order: 2, label: 'Charger la liste des que l\'objet la contenant' },
        {
          reference: 'R3', order: 2,
          label: `La liste ne sera jamais chargée. Il sera nécessaire
        de réaliser d\'utiliser une requete JQL pour obtenir le contenu de la liste` },
      ]
    };
  }

  nextStep() {
    this.state = State.END;
  }

}
