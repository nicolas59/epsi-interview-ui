import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PromotionComponent } from './components/promotion/promotion.component';
import { SessionComponent } from './components/session/session.component';
import { InterviewComponent } from './components/interview/interview.component';
import { PromotionFormComponent } from './components/promotion-form/promotion-form.component';
import { PromotionDetailComponent } from './components/promotion-detail/promotion-detail.component';
import { EtudiantFormComponent } from './components/etudiant-form/etudiant-form.component';
import { QuestionComponent } from './components/question/question.component';
import { ExamComponent } from './components/exam/exam.component';
import { InterviewDetailComponent } from './components/interview-detail/interview-detail.component';
import { QuestionFormComponent } from './components/question-form/question-form.component';
import { SessionDetailComponent } from './components/session-detail/session-detail.component';

const routes: Routes = [
  { path: 'promotion', component: PromotionComponent },
  { path: 'promotion-detail/:promotion', component: PromotionDetailComponent },
  { path: 'promotion-form', component: PromotionFormComponent },
  { path: 'session', component: SessionComponent },
  { path: 'session/:sessionId', component: SessionDetailComponent },
  { path: 'interview', component: InterviewComponent },
  { path: 'interview/:id', component: InterviewDetailComponent },
  { path: 'promotion/:promotion/etudiant-form', component: EtudiantFormComponent },

  { path: 'question-form/:surveyId/question/:questionId', component: QuestionFormComponent },

  { path: 'question-form/:surveyId', component: QuestionFormComponent },

  { path: 'exam/:sessionId/uuid/:uuid', component: ExamComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
