import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AbstractResource } from './abstract.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService extends AbstractResource<Session, number> {

  resourceName = 'session';

  constructor(private _http: HttpClient) {
    super(_http);
  }

  getSession(sessionId: string, uuid: string) {
    return this._http.get<Exam>(`${environment.urlApi}/session/${sessionId}/uuid/${uuid}`);
  }

  getContext(sessionId: number, studentId: number) {
    return this._http.get<Context>(`${environment.urlApi}/session/${sessionId}/student/${studentId}`);
  }

  addCategory(sessionId: number, categoryId: number) {
    return this._http.post(`${environment.urlApi}/${this.resourceName}/${sessionId}/category/${categoryId}`, "");
  }

  answer(uuid: string, sessionId: string, questionId: number, answer: string) {
    return this._http.post(`${environment.urlApi}/session/${sessionId}/answer`,
      {
        uuid: uuid,
        answer: answer,
        questionId: {
          id: questionId
        }
      });
  }

  sendEmail(session: Session, context: Context) {
    return this._http.post(`${environment.urlApi}/session/${session.id}/student/${context.student.id}/action`,
      {
        action: 'email'
      });
  }

  sendEmailAll(session: Session) {
    return this._http.post(`${environment.urlApi}/session/${session.id}/action`,
      {
        action: 'email'
      });
  }
}
