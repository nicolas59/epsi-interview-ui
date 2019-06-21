import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


export abstract class AbstractResource<T, ID> {

    abstract resourceName: string;

    constructor(private http: HttpClient) {

    }

    getAll() {
        console.log(`${environment.urlApi}/${this.resourceName}`);
        return this.http.get<[T]>(`${environment.urlApi}/${this.resourceName}`);
    }

    findById(id: ID) {
        return this.http.get<T>(`${environment.urlApi}/${this.resourceName}/${id}`);
    }


    save(data: T): Observable<HttpResponse<T>> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this.http.post(`${environment.urlApi}/${this.resourceName}`, data, {
            headers: headers,
            observe: 'response',

        }) as Observable<HttpResponse<T>>;
    }

}
