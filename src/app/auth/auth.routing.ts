import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent }
];

export const AuthRouting: ModuleWithProviders = RouterModule.forChild(routes);

export class AuthComponents {
    public static components = [
        LoginComponent,
        RegisterComponent
    ];
}
