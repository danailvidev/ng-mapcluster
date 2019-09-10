import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'npo-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  isCollapsed = false;
  @Input() menuItems: any;

  @Output() logout: EventEmitter<any> = new EventEmitter();
  @Output() showSettings: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  callBack(callBack: any) {
    switch (callBack) {
      case 'logout': {
        this.logout.emit(true);
        break;
      }
      case 'settings': {
        this.showSettings.emit(true);
        break;
      }
    }
  }
}
