import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/security/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-logout',
    template: ''
})

export class LogoutComponent implements OnInit {

    constructor(private _authService: AuthService, private router: Router) {}

    ngOnInit() {
        this._authService.logout();
        this.router.navigate(['login']);
    }
}
