import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../services/youtube.service';
import { SessionComponent } from '../components/session/session.component';
import { NzModalService } from 'ng-zorro-antd';
import { TimeService } from '../services/time.service';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Component({
  template: ''
})
export class PagesComponent implements OnInit {

  constructor(private modalService: NzModalService, private timeService: TimeService,
    private storageService: StorageService, private router: Router) { }

  title = 'youtube-timecontrol-app';
  public userTimerConfig;

  ngOnInit() {
    this.startSession();
  }

  setUserTimeConfig(event) {
    this.userTimerConfig = event;
  }

  startSession(): void {
    let user = JSON.parse(this.storageService.getData('user'));

    if (user && user['id']) {
      this.router.navigate(['./home'])
      return;
    }

    let sessionModal = this.modalService.create({
      nzTitle: 'Nova sessão',
      nzContent: SessionComponent,
      nzFooter: null
    });

    sessionModal.afterClose.subscribe(data => {
      this.router.navigate(['./home'])
    });
  }

}
