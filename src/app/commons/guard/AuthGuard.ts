import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {AuthService} from '../../services/security/auth.service';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import {AlertService } from '../../services/alert.service';

@Injectable()

export class AuthGuard implements  CanActivate {
    constructor(private router: Router,
                private authenticationService: AuthService,
                private alertService: AlertService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        if (localStorage.getItem('currentUser') && localStorage.getItem('token')) {
            return this.authenticationService.isLogged()
                .subscribe(result => {
                       if (result) {
                           this.router.navigate(['/']);
                       } else {
                           this.authenticationService.logout();
                           this.router.navigate(['/login']);
                       }
                        return true;
                    },
                    error => {
                        this.alertService.error(error.error.message);
                    }
                );
        }
        return true;
    }
}