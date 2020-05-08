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

  getRequestCredit()
  {
    return this.httpClient.get<any>(this.url + 'getRequestCredit');
  }

  getRequestDetails( id:number )
  {
    return this.httpClient.get<any>(this.url + 'getRequestDetails/' + id);
  }

  acceptRequest( myData:any)
  {
    return this.httpClient.post<any>(this.url + 'acceptRequest', myData);
  }
  
  cancelRequest( myData:any)
  {
    return this.httpClient.post<any>(this.url + 'cancelRequest', myData);
  }
  
  getCreditsToPay()
  {
    return this.httpClient.get<any>(this.url + 'getCreditsToPay');
  }

  payCredit( myData:any)
  {
    return this.httpClient.post<any>(this.url + 'payCredit', myData);
  }

  getBalance( myData:any)
  {
    return this.httpClient.post<any>(this.url + 'getBalance', myData);
  }

  debitBalance( myData:any)
  {
    return this.httpClient.post<any>(this.url + 'debitBalance', myData);
  }


}
