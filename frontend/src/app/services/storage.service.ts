import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class StorageService {

  private storageChanged: BehaviorSubject<any> = new BehaviorSubject({});

  changed(): Observable<any> {
    return this.storageChanged.asObservable();
  }

  getData(key: string): any {
    let data = JSON.parse(localStorage.getItem(key));
    return data;
  }

  setData(key: string, data: any) {
    console.log('setando storage')
    localStorage.setItem(key, JSON.stringify(data));
    this.storageChanged.next(data)

  }

  removeData(key: string) {
    localStorage.removeItem(key);
    this.storageChanged.next(null)
  }
}
