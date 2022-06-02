import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient : HttpClient) { }

  getHomes$(){
    return this.httpClient.get<any>('assets/homes.json');
  }

  bookHome$(){
    return this.httpClient.post('https://run.mocky.io/v3/9c4def35-f6d5-4d4a-a140-10985d62e7b2', {});
  }
}
