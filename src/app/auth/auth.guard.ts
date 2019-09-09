import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private auth: AuthService) { }

    canActivate(
        next: ActivatedRouteSnapshot): Observable<boolean> {

        return this.auth.user$.pipe(
            take(1),
            map(user => {
                if (user) {
                    return true;
                } else {
                    this.router.navigate(['/auth/login']);
                    return false;
                }
            }),
        );
    }
}
