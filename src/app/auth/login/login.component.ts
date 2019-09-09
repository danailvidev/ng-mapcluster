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
  error: any;

  constructor(private fb: FormBuilder, private authSvc: AuthService, public router: Router) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  submitForm(): void {
    if (this.validateForm.invalid) {
      // tslint:disable-next-line: forin
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }

      return;
    }

    const form = this.validateForm.getRawValue();
    this.authSvc.login(form)
      .then((result) => {
        if (result) {
          this.router.navigate(['/map']);
        } else {
          this.error = result;
        }
      }).catch((err) => {
        this.error = err;
      });
  }

  googleLogin() {
    this.authSvc.googleLogin();
  }
}
