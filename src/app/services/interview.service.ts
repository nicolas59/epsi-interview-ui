import { Injectable } from '@angular/core';
import { AbstractResource } from './abstract.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InterviewService extends AbstractResource<Survey, number> {

  resourceName = 'survey';

  constructor(private _http: HttpClient) {
    super(_http);
  }
}
