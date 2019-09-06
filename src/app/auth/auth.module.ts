import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthComponents, AuthRouting } from './auth.routing';
import { ReactiveFormsModule } from '@angular/forms';

import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
    declarations: [AuthComponents.components],
    imports: [
        CommonModule,
        AuthRouting,
        ReactiveFormsModule,

        // ngzorro
        NzInputModule,
        NzFormModule,
        NzButtonModule,
        NzIconModule,
        NzSelectModule,
        NgZorroAntdModule
    ]
})
export class AuthModule { }
