import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';


export abstract class AbstractResource<T, ID> {

    abstract resourceName: string;

    constructor(private http: HttpClient) {

    }

    getAll() {
        return this.http.get<[T]>(`${environment.urlApi}/${this.resourceName}`);
    }

    findById(id: ID) {
        return this.http.get<T>(`${environment.urlApi}/${this.resourceName}/${id}`);
    }


}
