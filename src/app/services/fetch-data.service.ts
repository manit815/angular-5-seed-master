import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Data } from './data';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FetchDataService {

  url: string = 'assets/data.json';

  constructor(private http: HttpClient) { }

  getData (): Observable<Data[]> {
    return this.http.get<Data[]>(this.url);
  }

}
