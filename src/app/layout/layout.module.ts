import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzMessageModule } from 'ng-zorro-antd/message';

import { LayoutComponents, LayoutRouting } from './layout.routing';
import { NavComponent } from './nav/nav.component';
import { SettingsComponent } from './settings/settings.component';
import { SettingsFormModule } from './settings/settings-form/settings-form.module';
import { SettingsService } from './settings/settings.service';

@NgModule({
  declarations: [LayoutComponents.components, NavComponent, SettingsComponent],
  imports: [
    NzLayoutModule,
    NzMenuModule,
    CommonModule,
    LayoutRouting,
    NzIconModule,
    NzDrawerModule,
    NzMessageModule,
    SettingsFormModule
  ],
  providers: [
    SettingsService
  ]
})
export class LayoutModule { }
