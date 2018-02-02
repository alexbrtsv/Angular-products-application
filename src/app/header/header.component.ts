import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html'
})

export class HeaderComponent {

	constructor(private authService: AuthService){}

	isAuth() {
		return this.authService.isAuthenticated();
	}
	
	onLogout() {
		this.authService.logoutUser();
	}
}