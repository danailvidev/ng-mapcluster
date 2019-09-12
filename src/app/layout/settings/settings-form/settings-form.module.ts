import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SettingsFormComponent } from './settings-form.component';
import { FormUploadComponent } from './file-upload.component';
import { UploadFileService } from './file-upload.service';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        NzButtonModule,
        NzIconModule,
        NzFormModule,
        NzInputModule,
        NzSelectModule
    ],
    exports: [SettingsFormComponent],
    declarations: [SettingsFormComponent, FormUploadComponent],
    providers: [UploadFileService],
})
export class SettingsFormModule { }
