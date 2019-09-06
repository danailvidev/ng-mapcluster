import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path:  'forgot-password', component:  ForgotPasswordComponent },
];

export const AuthRouting: ModuleWithProviders = RouterModule.forChild(routes);

export class AuthComponents {
    public static components = [
        LoginComponent,
        RegisterComponent,
        ForgotPasswordComponent
    ];
}
