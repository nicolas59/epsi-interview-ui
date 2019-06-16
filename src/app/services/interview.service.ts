import { Injectable } from '@angular/core';
import { AbstractResource } from './abstract.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InterviewService extends AbstractResource<Survey, number> {

  resourceName = 'survey';

  constructor(private _http: HttpClient) {
    super(_http);
  }

  addQuestion(surveyId: string, question: Question) {
    return this._http.post(`${environment.urlApi}/${this.resourceName}/${surveyId}/question`, question);
  }

  getQuestion(surveyId: string, questionId: string) {
    return this._http.get(`${environment.urlApi}/${this.resourceName}/${surveyId}/question/${questionId}`);
  }
}
