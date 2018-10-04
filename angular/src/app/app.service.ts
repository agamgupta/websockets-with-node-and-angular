import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable , Observer} from 'rxjs';


export interface Payload {
    name : any;
}
@Injectable()
export class AppService{
    constructor(private http: HttpClient) {}
    getname() : Observable<any> {
        return this.http.get<any>("http://localhost:8085/name");
    }
}

