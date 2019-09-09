import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgZorroAntdModule } from 'ng-zorro-antd';
import { IconModule } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { LayoutComponents, LayoutRouting } from './layout.routing';
import { NavComponent } from './nav/nav.component';

@NgModule({
  declarations: [LayoutComponents.components, NavComponent],
  imports: [
    NgZorroAntdModule,
    CommonModule,
    LayoutRouting,
    IconModule,
    NzIconModule
  ],
  providers: [
  ]
})
export class LayoutModule { }
