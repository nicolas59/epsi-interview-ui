import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PromotionComponent } from './components/promotion/promotion.component';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InterviewComponent } from './components/interview/interview.component';
import { SessionComponent } from './components/session/session.component';
import { PromotionFormComponent } from './components/promotion-form/promotion-form.component';
import { EtudiantFormComponent } from './components/etudiant-form/etudiant-form.component';
import { PromotionDetailComponent } from './components/promotion-detail/promotion-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { QuestionComponent } from './components/question/question.component';
import { ExamComponent } from './components/exam/exam.component';


@NgModule({
  declarations: [
    AppComponent,
    PromotionComponent,
    InterviewComponent,
    SessionComponent,
    PromotionFormComponent,
    EtudiantFormComponent,
    PromotionDetailComponent,
    QuestionComponent,
    ExamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatCardModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
