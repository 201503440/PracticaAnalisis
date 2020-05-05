import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestCreditService {

  url = 'http://localhost:3000/';
  constructor(private httpClient: HttpClient) { }

  requestCredit( myData:any)
  {
    return this.httpClient.post<any>(this.url + 'requestCredit', myData);
  }
}
