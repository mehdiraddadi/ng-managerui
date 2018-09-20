import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import {AuthService} from "../../services/security/auth.service";
import { RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";

@Injectable()

export class AuthGuard implements  CanActivate {
    constructor(private router: Router, private authenticationService: AuthService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        if(localStorage.getItem('currentUser')) {
            return this.authenticationService.isLogged()
                .subscribe(result => {
                       if(result) {
                           this.router.navigate(['/']);
                       }
                        return true;
                    }
                );
        }
        return true;
    }
}