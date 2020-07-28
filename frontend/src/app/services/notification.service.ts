import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private message: NzMessageService) { }

  show(type, message) {
    this.message.create(type, message);
  }
}
