import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/security/auth.service";
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    username: string;
    password: string;
    erro: string;

    constructor(private router: Router,
                private authenticationService: AuthService) {
    }

    ngOnInit() {
        this.authenticationService.logout();
    }

    login(e) {
        this.authenticationService.login(this.username, this.password)
            .subscribe(result => {
                    if (result) {
                        this.router.navigate(['/']);
                    }
                },
                loginError => this.erro = loginError.message + ' : verify  your username or password !  '
            );
    }

}
