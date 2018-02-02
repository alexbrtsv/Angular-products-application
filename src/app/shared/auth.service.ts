import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

import { User } from './models/user';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
	
	public token: string;

	constructor(private http: Http, private router: Router) {

		var currentUser = localStorage.getItem('currentUser');
		this.token = currentUser;

	}

	registerUser(user: User): Observable<any> {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });

		return this.http.post('https://smktesting.herokuapp.com/api/register/', user)
		.map((response: Response) => {
			let success = response.json() && response.json().success;
			if (success) {
				return true;
			} else {
				return response.json().message;
			}
		});

	}

	loginUser(user: User): Observable<any> {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });

		return this.http.post('https://smktesting.herokuapp.com/api/login/', user)
		.map((response: Response) => {
			let token = response.json() && response.json().token;
			if (token) {

				this.token = token;

        		// token in local storage to keep user logged
        		localStorage.setItem('currentUser', token);

        	// loggin success
        	return true;
        } else {
        	// login fail
        	return response.json().message;
        }
    });
	}

	logoutUser(): void {
    	// clear token / log user out
    	this.token = null;
    	localStorage.removeItem('currentUser');
    	this.router.navigate(['/login']);
    }

    isAuthenticated() {
    	if(localStorage.getItem('currentUser')){
    		return true;
    	} else {
    		return false;
    	}
    }

    private extractData(res: Response) {
    	let body = res.json();
    	return body.data || { };
    }

}
