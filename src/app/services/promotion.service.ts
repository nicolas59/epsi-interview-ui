import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AbstractResource } from './abstract.service';

@Injectable({
  providedIn: 'root'
})
export class PromotionService extends AbstractResource<Category, number> {

  resourceName = 'category';

  constructor(private _http: HttpClient) {
    super(_http);
  }

  findAllStudents(id: number) {
    return this._http.get<[Student]>(`${environment.urlApi}/${this.resourceName}/${id}/students`);
  }
}
