import { Component, OnInit } from '@angular/core';
import { NzTabPosition, NzModalRef } from 'ng-zorro-antd';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService, UserI } from 'src/app/services/user.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss'],
  providers: [AuthService]
})
export class SessionComponent implements OnInit {

  tabs: Array<string> = ['Login', 'Register'];
  nzTabPosition: NzTabPosition = 'top';
  selectedIndex = 0;

  loginForm!: FormGroup;
  registrationForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private userService: UserService, private storage: StorageService,
    private modal: NzModalRef, private notification: NotificationService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      remember: [true]
    });
    this.registrationForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    });
  }

  submitLoginForm(): void {
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.auth(this.loginForm.getRawValue())
      .then((user: UserI) => {
        this.loginSuccess(user);
      })
      .catch((err) => {
        alert(err.message)
        this.notification.show('error', err.message)
      })
  }

  submitRegistrationForm(): void {
    if (this.registrationForm.invalid) {
      return;
    }
    let registerData = this.registrationForm.getRawValue();
    this.userService.register(registerData)
      .then((result) => {
        this.notification.show('success', 'Conta criada com sucesso, faça o login')
        this.loginForm.controls.email.setValue(registerData.email);
        this.loginForm.controls.password.setValue(registerData.password);
        this.selectedIndex = 0;
        this.registrationForm.reset();
      })
      .catch((err) => {
        console.log(err)
        if (err.message && err.message.error) {
          this.notification.show('error', err.message.error)
        }
      })
  }

  loginSuccess(user) {
    this.notification.show('success', `Bem vindo(a) ${user.name}`)
    this.storage.setData('user', JSON.stringify(user));
    this.modal.close(user);
  }

}
