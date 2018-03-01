import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class ReadJsonService {

  jsonUrl = "./assets/search.json"
  constructor(private http: HttpClient) {
  }

  readJson(startAt,endAt): Observable<any> {
    return this.http.get(this.jsonUrl);
  }
}
