import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from './auth.service';
import { AuthComponents, AuthRouting } from './auth.routing';
import { AuthGuard } from './auth.guard';
import { RegisterFormModule } from './register/register-form/register-form.module';
import { LoginFormModule } from './login/login-form/login-form.module';

@NgModule({
    declarations: [AuthComponents.components],
    imports: [
        CommonModule,
        AuthRouting,
        RegisterFormModule,
        LoginFormModule
    ],
    providers: [AuthService, AuthGuard]
})
export class AuthModule { }
