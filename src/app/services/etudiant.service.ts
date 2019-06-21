import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AbstractResource } from './abstract.service';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService extends AbstractResource<Student, number> {

  resourceName = 'student';

  constructor(private _http: HttpClient) {
    super(_http);
  }

}
