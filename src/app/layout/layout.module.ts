import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';

import { LayoutComponents, LayoutRouting } from './layout.routing';
import { NavComponent } from './nav/nav.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [LayoutComponents.components, NavComponent, SettingsComponent],
  imports: [
    NzLayoutModule,
    NzMenuModule,
    CommonModule,
    LayoutRouting,
    NzIconModule,
    NzDrawerModule
  ],
  providers: [
  ]
})
export class LayoutModule { }
