import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {

  myForm: FormGroup;
  error = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.loginUser(this.myForm.value)
    .subscribe(result => {
      if (result === true) {
        this.router.navigate(['/products']);
      } else {
        this.error = true;
        this.errorMessage = result;
      }
    });
  }

  ngOnInit():any {
    this.myForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

}
