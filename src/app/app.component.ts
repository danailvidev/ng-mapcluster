import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'npo-root',
  template: `
  <ng-template #template let-notification>
      <div class="ant-notification-notice-content">
        <div>
          <div class="ant-notification-notice-message">Налична нова версия</div>
          <div class="ant-notification-notice-description">
            Новата версия ще бъде изтеглена автоматично. Моля изчакайте.
          </div>
        </div>
      </div>
    </ng-template>
  <router-outlet></router-outlet>
  `,
  styles: [``]
})
export class AppComponent implements OnInit {
  newVersion: any = false;
  @ViewChild('template', { static: true }) templateRef: TemplateRef<any>;

  constructor(public swUpdate: SwUpdate, private notification: NzNotificationService) { }

  ngOnInit() {
    this.swUpdate.available
      .subscribe(update => {
        this.notification.template(this.templateRef, {
          nzDuration: 3000,
        });
        setTimeout( () => {
          this.reload();
        }, 3000);
      });
  }

  reload() {
    this.swUpdate.activated
      .subscribe(update => window.location.reload());
    this.swUpdate.activateUpdate();
  }

}
