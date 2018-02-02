import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthService } from '../shared/auth.service';

@Component({
	selector: 'app-registration',
	templateUrl: './registration.component.html'
})
export class RegistrationComponent implements OnInit {

	myForm: FormGroup;
	error = false;
	errorMessage = '';

	constructor(
		private formb: FormBuilder, 
		private authService: AuthService, 
		private router: Router) {}

	onRegister() {
		this.authService.registerUser(this.myForm.value)
		.subscribe(result => {
			if (result === true) {
				this.router.navigate(['/login']);
			} else {
				this.error = true;
				this.errorMessage = result;
			}
		});
	}

	isEqualPassword(control: FormControl): {[s: string]: boolean} {
		if (!this.myForm) {
			return {passwordsNotMatch: true};
		}

		if (control.value !== this.myForm.controls['password'].value) {
			return {passwordsNotMatch: true};
		}
	}

	ngOnInit(): any{
		this.myForm = this.formb.group({
			username: ['', Validators.required],
			password: ['', Validators.required],
			confirmPassword: ['', Validators.compose([
				Validators.required,
				this.isEqualPassword.bind(this)
				])],
		});
	}
}