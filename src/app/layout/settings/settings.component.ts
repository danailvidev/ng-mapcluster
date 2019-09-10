import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { SettingsService } from './settings.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'npo-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  @Input() visible: boolean;

  @Output() hideSettings: EventEmitter<any> = new EventEmitter();

  placement = 'left';

  constructor(private settingsSvc: SettingsService, private message: NzMessageService) { }

  ngOnInit() {

  }

  open(): void {
    this.hideSettings.emit(false);
    this.visible = true;
  }

  close(): void {
    this.visible = false;
    this.hideSettings.emit(true);
  }

  onSubmit(form: any) {
    this.settingsSvc.updateUser(form).then(x => {
      this.close();
      this.message.create('success', `Данните бяга успешно записани.`);
    }).catch(err => console.log(err));
  }
}
