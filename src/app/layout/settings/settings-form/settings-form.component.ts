import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { take } from 'rxjs/operators';

import { AuthService, User } from 'src/app/auth/auth.service';

@Component({
    selector: 'npo-settings-form',
    templateUrl: './settings-form.component.html',
    styleUrls: ['./settings-form.component.scss']
})

export class SettingsFormComponent implements OnInit {
    validateForm: FormGroup;
    userEmail: any;
    userLocation: any;

    @Output() public formSubmit = new EventEmitter<any>();

    constructor(private fb: FormBuilder, private authSvc: AuthService) { }

    ngOnInit() {
        this.authSvc.user$.pipe(take(1)).subscribe((res: User) => {
            this.userEmail = res.email;
            if (res.location) {
                this.userLocation = [res.location.latitude, res.location.longitude];
            }

            this.validateForm.patchValue({
                name: res.name,
                phone: res.phone || '',
                info: res.info || '',
                uid: res.uid
            });
        });

        this.validateForm = this.fb.group({
            name: null,
            phone: null,
            info: null,
            uid: null
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
}
