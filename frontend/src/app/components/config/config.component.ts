import { Component, OnInit, Input } from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import { StorageService } from 'src/app/services/storage.service';
import { TimeService } from 'src/app/services/time.service';
import { UserI } from '../../services/user.service';
@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
  providers: [NotificationService, StorageService]
})
export class ConfigComponent implements OnInit {
  @Input() value = '';
  public form: FormGroup;
  public user: UserI;

  constructor(private drawerRef: NzDrawerRef<string>, private notification: NotificationService,
    private storage: StorageService, private timeService: TimeService) {

    this.form = new FormGroup({
      segunda: new FormControl('', [Validators.required, Validators.pattern("^[0-9.]*$"), Validators.maxLength(3)]),
      terca: new FormControl('', [Validators.required, Validators.pattern("^[0-9.]*$"), Validators.maxLength(3)]),
      quarta: new FormControl('', [Validators.required, Validators.pattern("^[0-9.]*$"), Validators.maxLength(3)]),
      quinta: new FormControl('', [Validators.required, Validators.pattern("^[0-9.]*$"), Validators.maxLength(3)]),
      sexta: new FormControl('', [Validators.required, Validators.pattern("^[0-9.]*$"), Validators.maxLength(3)]),
      sabado: new FormControl('', [Validators.required, Validators.pattern("^[0-9.]*$"), Validators.maxLength(3)]),
      domingo: new FormControl('', [Validators.required, Validators.pattern("^[0-9.]*$"), Validators.maxLength(3)]),
    })
  }

  ngOnInit() {
    let timeConfig = this.storage.getData('timeConfig');
    if (timeConfig) {
      this.form.patchValue(timeConfig);
    }
  }



  setUserTimeConfig(): void {
    this.user = JSON.parse(this.storage.getData('user'));

    if (!this.user) {
      this.notification.show('error', 'Realize o login')
      return;
    }
    if (this.form.invalid) {
      this.notification.show('error', 'Por favor verifique os campos.')
      return;
    }

    let timeConfig = this.form.getRawValue();
    console.log(this.storage.getData('user'), timeConfig)
    this.timeService.setUserTime(this.user['id'], { timeConfig })
      .then((result) => {
        this.storage.setData('timeConfig', timeConfig);

        this.drawerRef.close(timeConfig);
      })
      .catch((error) => {
        console.log(error);
      })

  }

}
