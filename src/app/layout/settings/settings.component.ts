import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'npo-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  @Input() visible: boolean;

  @Output() hideSettings: EventEmitter<any> = new EventEmitter();
  placement = 'left';

  constructor() { }

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
}
