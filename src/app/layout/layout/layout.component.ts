import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'npo-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  isCollapsed = true;
  showSettings = false;
  getNewLocation = false;
  menuItems: any = [
    {
      iconType: 'environment',
      label: 'Нова локация',
      callBack: 'newLocation'
    },
    {
      iconType: 'setting',
      label: 'Настройки',
      callBack: 'settings'
    },
    {
      iconType: 'logout',
      label: 'Изход',
      callBack: 'logout'
    }
  ];

  constructor(private authSvc: AuthService) { }

  ngOnInit() {
  }

  logout() {
    this.authSvc.signOut();
  }

  onShowSettings() {
    this.showSettings = true;
  }

  onHideSettings() {
    this.showSettings = !this.showSettings;
  }

  onNewLocation() {
    this.getNewLocation = true;
  }
}
