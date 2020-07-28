import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  constructor(public http: HttpClient) { }

  getVideos(searchTerm) {
    let url = 'http://localhost:3000/videos';
    let promise = new Promise((resolve, reject) => {
      this.http.post(url, { searchTerm })
        .toPromise().then(
          res => resolve(res),
          error => reject(error),
        );
    });
    return promise;
  }
}
