import {BrowserModule} from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { MDBBootstrapModule } from 'angular-bootstrap-md';


import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {HomeComponent} from './home/home.component';
import {FormsModule} from '@angular/forms';
import {AuthService} from './services/security/auth.service';
import {AuthGuard} from './commons/guard/AuthGuard';

import {HttpClientModule } from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {AlertService} from './services/alert.service';
import {AlertComponent} from './commons/directive/alert.component';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import {LogoutComponent} from './login/logout.component';

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
    {path: 'register', component: RegisterComponent},
    {path: 'logout', component: LogoutComponent}
];

/**
 * Custom angular notifier options
 */
const customNotifierOptions: NotifierOptions = {
    position: {
        horizontal: {
            position: 'left',
            distance: 12
        },
        vertical: {
            position: 'bottom',
            distance: 12,
            gap: 10
        }
    },
    theme: 'material',
    behaviour: {
        autoHide: 5000,
        onClick: 'hide',
        onMouseover: 'pauseAutoHide',
        showDismissButton: true,
        stacking: 4
    },
    animations: {
        enabled: true,
        show: {
            preset: 'slide',
            speed: 300,
            easing: 'ease'
        },
        hide: {
            preset: 'fade',
            speed: 300,
            easing: 'ease',
            offset: 50
        },
        shift: {
            speed: 300,
            easing: 'ease'
        },
        overlap: 150
    }
};

@NgModule({
    declarations: [
        AppComponent,
        LogoutComponent,
        LoginComponent,
        RegisterComponent,
        HomeComponent,
        AlertComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        NotifierModule.withConfig(customNotifierOptions),
        MDBBootstrapModule.forRoot()
    ],
    exports: [RouterModule],
    providers: [AuthService, AuthGuard, AlertService],
    bootstrap: [AppComponent],
    schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule {
}
