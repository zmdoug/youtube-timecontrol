import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { API_CONFIG } from '../app.settings';

export interface UserI {
  id: string,
  name: string,
  email: string,
  token: string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http: HttpClient, private storage: StorageService) { }

  register(registrationData) {
    let url = API_CONFIG.url + 'users';
    let promise = new Promise((resolve, reject) => {
      this.http.post(url, registrationData)
        .toPromise().then(
          res => resolve(res),
          error => reject(error),
        );
    });
    return promise;
  }

  logout() {
    this.storage.removeData('user');
    this.storage.removeData('timeConfig');
  }
}
