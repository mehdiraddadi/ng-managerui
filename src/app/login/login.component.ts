import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/security/auth.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../services/alert.service';
import {NotifierService} from 'angular-notifier';

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

    notifier: NotifierService;

    constructor(private router: Router,
                private authenticationService: AuthService,
                private formBuilder: FormBuilder,
                private alertService: AlertService,
                private notifierService: NotifierService) {
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
        this.authenticationService.logout();
        this.notifier = this.notifierService;
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
                            this.notifier.notify('error', erro.error.message);
                            this.alertService.error(erro.error.message);
                        } else if (erro.error.code === 500) {
                            this.notifier.notify('error', erro.error.message);
                        }
                    }
                );
        }
    }
}
