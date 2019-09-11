import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'npo-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;
  errorMessage: any;

  constructor(private authSvc: AuthService, public router: Router) { }

  ngOnInit(): void { }

  onSubmit(form: any) {
    this.authSvc.login(form)
      .then((result) => {
        if (result) {
          this.router.navigate(['/map']);
        } else {
          this.errorMessage = result;
        }
      }).catch((err) => {
        this.errorMessage = err;
        setTimeout(() => {
          this.errorMessage = null;
        }, 4000);
      });
  }

  onGoogleLogin() {
    this.authSvc.googleLogin(false);
  }
}
