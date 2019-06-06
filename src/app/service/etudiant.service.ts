import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  constructor(private http: HttpClient) { }

  save(item: Student) {
    return this.http.post(`${environment.urlApi}/student`, item);
  }
}
