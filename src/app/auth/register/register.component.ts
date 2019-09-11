import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'npo-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  validateForm: FormGroup;
  errorMessage: any;

  constructor(private authSvc: AuthService) { }

  ngOnInit(): void {

  }

  onSubmit(form: any) {
    console.log(form);
    this.authSvc.emailRegister(form).catch((err) => {
      this.errorMessage = err.message;
      setTimeout(() => {
        this.errorMessage = null;
      }, 4000);
    });
  }

  onGoogleLogin() {
    this.authSvc.googleLogin();
  }
}
