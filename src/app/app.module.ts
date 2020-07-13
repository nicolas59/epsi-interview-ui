import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { PromotionComponent } from "./components/promotion/promotion.component";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatMenuModule } from "@angular/material/menu";
import { MatRadioModule } from "@angular/material/radio";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { MatNativeDateModule } from "@angular/material/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { InterviewComponent } from "./components/interview/interview.component";
import { SessionComponent } from "./components/session/session.component";
import { PromotionFormComponent } from "./components/promotion-form/promotion-form.component";
import { EtudiantFormComponent } from "./components/etudiant-form/etudiant-form.component";
import { PromotionDetailComponent } from "./components/promotion-detail/promotion-detail.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { QuestionComponent } from "./components/question/question.component";
import { ExamComponent } from "./components/exam/exam.component";
import { MarkdownModule } from "ngx-markdown";
import { InterviewDetailComponent } from "./components/interview-detail/interview-detail.component";
import { QuestionFormComponent } from "./components/question-form/question-form.component";
import { MatInputModule, MatSelect, MatSelectModule, MatCheckboxModule } from "@angular/material";
import { SessionDetailComponent } from "./components/session-detail/session-detail.component";
import { ToastrModule } from "ngx-toastr";
import { TokenInterceptor } from "./interceptor/TokenInterceptor";
import { TokenComponent } from "./components/token/token.component";
import { InterviewFormComponent } from "./components/interview-form/interview-form.component";
import { SessionFormComponent } from "./components/session-form/session-form.component";

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
    ExamComponent,
    InterviewDetailComponent,
    QuestionFormComponent,
    SessionDetailComponent,
    TokenComponent,
    InterviewFormComponent,
    SessionFormComponent
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
    MatRadioModule,
    MatFormFieldModule,
    MarkdownModule.forRoot(),
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
