import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'npo-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  isCollapsed = true;
  menuItems: any = [
    {
      iconType: 'environment',
      label: 'Нова локация'
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
}
