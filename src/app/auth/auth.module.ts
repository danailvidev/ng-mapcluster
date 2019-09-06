import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgZorroAntdModule } from 'ng-zorro-antd';

import { AuthService } from './auth.service';
import { AuthComponents, AuthRouting } from './auth.routing';
import { AuthGuard } from './auth.guard';

@NgModule({
    declarations: [AuthComponents.components],
    imports: [
        CommonModule,
        AuthRouting,
        ReactiveFormsModule,
        NgZorroAntdModule
    ],
    providers: [AuthService, AuthGuard]
})
export class AuthModule { }
