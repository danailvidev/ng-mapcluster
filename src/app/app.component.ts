import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'npo-root',
  template: `
  <button *ngIf="newVersion" nz-button [nzType]="'primary'" (click)="reload()">Нова версия</button>
  <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit {
  newVersion: any = false;

  constructor(public swUpdate: SwUpdate, private message: NzMessageService) { }

  ngOnInit() {
    this.swUpdate.available
      .subscribe(update => this.newVersion = true);
  }

  reload() {
    this.swUpdate.activated
      .subscribe(update => window.location.reload());
    this.swUpdate.activateUpdate();
  }

}
