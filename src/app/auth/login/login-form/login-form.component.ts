import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'npo-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  validateForm: FormGroup;
  error: any;

  @Output() public formSubmit = new EventEmitter<any>();
  @Output() public googleLogin = new EventEmitter<any>();

  constructor(private fb: FormBuilder, public router: Router) { }

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
    this.formSubmit.emit(form);
  }

  onGoogleLogin() {
    this.googleLogin.emit(true);
  }
}
