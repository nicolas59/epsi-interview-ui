import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { InterviewService } from 'src/app/services/interview.service';

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

  constructor(private surveyService: InterviewService) { }

  ngOnInit() {

    this.surveyService.findById(18).subscribe(survey => {
      this.currentNum = 1;
      this.questions = survey.questions;
      this.currentQuestion = this.questions[0];
    });
    /*
        this.questions = [
          {
            id: 1,
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
          },
          {
            id: 2,
            label: `Que fait l\'annotation @Entity ?`,
            items: [
              { reference: 'R1', order: 1, label: 'Charger la liste uniquement lorsque celle-ci est accéder par l\'application' },
              { reference: 'R2', order: 2, label: 'Charger la liste des que l\'objet la contenant' },
              {
                reference: 'R3', order: 2,
                label: `La liste ne sera jamais chargée. Il sera nécessaire
            de réaliser d\'utiliser une requete JQL pour obtenir le contenu de la liste` },
            ]
          }
        ];
    
        this.currentQuestion = this.questions[0];*/
  }

  nextStep() {
    if (this.questions.length === this.currentNum) {
      this.state = State.END;
    } else {
      this.currentQuestion = this.questions[this.currentNum];
      this.currentNum++;
    }
  }

}
