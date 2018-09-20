import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/security/auth.service';
import {Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../services/alert.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    username: string;
    password: string;
    erro: string;
    submitted = false;

    constructor(private router: Router,
                private authenticationService: AuthService,
                private formBuilder: FormBuilder,
                private alertService: AlertService) {
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
        this.authenticationService.logout();
    }

    get f() {
        return this.loginForm.controls;
    }

    login(e) {
        this.submitted = true;
        if (!this.loginForm.invalid) {
            this.authenticationService.login(this.username, this.password)
                .subscribe(result => {
                        if (result) {
                            this.alertService.success('you are logged with success !', true);
                            this.router.navigate(['/']);
                        }
                    },
                    erro => {
                    if (erro.error.code === 404) {
                        this.alertService.error(erro.error.message);
                        }
                }
                );
        }
    }
}
