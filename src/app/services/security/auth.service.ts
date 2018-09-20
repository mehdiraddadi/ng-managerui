import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import { User } from '../../entity/user';


const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({providedIn: 'root'})

export class AuthService {

    public token ;
    private heroesUrl = 'http://localhost/api_managerui/web/app_dev.php/api/';

    constructor(
        private http: HttpClient) {
    }

    login(username: string, password: string): Observable<boolean> {
        const headers = new HttpHeaders();
        headers.append('content-type', 'application/json');
        const body = {
            'account': {
                'login': username,
                'password': password
            }
        };


        return this.http.post('http://localhost/Manager-UI/web/app_dev.php/api/login', body, {headers: headers})
            .pipe(
                map((user: User) => {
                    if (user) {
                        this.token = user.token;
                        localStorage.setItem('token', user.token);
                        localStorage.setItem('currentUser', user.email);
                        return true;
                    } else {
                        return false;
                    }
                }));

    }

    isLogged(): Observable<boolean> {
        const headers = new HttpHeaders();
        headers.append('content-type', 'application/json');
        const body = {
            'account': {
                'username': localStorage.getItem('currentUser'),
                'token': localStorage.getItem('token')
            }
        };

        return this.http.post('http://localhost/Manager-UI/web/app_dev.php/api/check_login', body, {headers: headers})
            .pipe(
                map(response => {
                    if (response) {
                        return true;
                    } else {
                        return false;
                    }
                }),
                catchError(this.handleError<any>('check login')
                )
            );
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.log(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(error as T);
        };
    }

    /** Log a HeroService message with the MessageService */
    private log(message: string) {
        console.log(message);
    }
}