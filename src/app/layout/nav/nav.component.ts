import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'npo-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  @Input() menuItems: any;

  @Output() logout: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onLogout() {
    this.logout.emit(true);
  }

  callBack(callBack: any) {
    switch (callBack) {
      case 'logout': {
        this.onLogout();
      }
    }
  }
}