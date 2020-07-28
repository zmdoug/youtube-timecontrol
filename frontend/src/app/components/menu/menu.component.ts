import { Component, ViewChild, TemplateRef, Output, OnInit } from '@angular/core';
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';
import { ConfigComponent } from '../config/config.component';
import { EventEmitter } from 'events';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'menu-horizontal',
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.scss'],
  providers: [StorageService]
})

export class MenuComponent {

  @Output() userTimerConfig = new EventEmitter();

  @ViewChild('drawerTemplate', { read: false }) drawerTemplate?: TemplateRef<{
    $implicit: { value: string };
    drawerRef: NzDrawerRef<string>;
  }>;
  value = 'ng';

  constructor(private drawerService: NzDrawerService, public storage: StorageService,
    private userService: UserService, private route: Router) { }
  ngOnInit() {
  }

  logout() {
    this.userService.logout();
    this.route.navigate(['./'])
  }
}
