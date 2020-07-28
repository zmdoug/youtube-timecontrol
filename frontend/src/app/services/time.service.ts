import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../app.settings';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor(public http: HttpClient) { }

  getUserTime(userId) {
    let url = API_CONFIG.url + `time/${userId}`;
    let promise = new Promise((resolve, reject) => {
      this.http.get(url)
        .toPromise().then(
          res => resolve(res),
          error => reject(error),
        );
    });
    return promise;
  }

  setUserTime(userId, timeData) {
    let url = API_CONFIG.url + `time/${userId}`;
    let promise = new Promise((resolve, reject) => {
      this.http.put(url, timeData)
        .toPromise().then(
          res => resolve(res),
          error => reject(error),
        );
    });
    return promise;
  }
}
