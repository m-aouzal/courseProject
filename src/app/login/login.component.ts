import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import FormBuilder and other necessary modules
import { UsersloginService } from './users.login.service';
import { Router } from '@angular/router';
import { ComponentsForm } from '../ComponentsForm';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html', // Update with the correct template URL
  styleUrls: ['./login.component.css'] // Update with the correct style URL
})
export class LoginComponent implements OnInit,ComponentsForm {
  loginForm: FormGroup; // Declare the form group
  authFailed: boolean = false;
  loading : boolean = false;

  constructor(private formBuilder: FormBuilder, 
    private usersService : UsersloginService,
    private router :Router) { // Inject the FormBuilder service
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  ngOnInit() {
    if (this.usersService.isAuthenticated()) {
      // User is already authenticated, redirect or perform an action
      this.router.navigate(['/recipes']); // Example: Redirect to dashboard
    }
  }
  onSubmit() {
    this.loading = true; // Set loading to true
  
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
  
      this.usersService.authenticateUser(formData.email, formData.password)
        .then(userExists => {
          if (userExists) {
            this.authFailed = false;
            this.router.navigate(['/recipes']);
            // Perform any further actions, like navigation or setting authentication state
          } else {
            this.resetAuthentication();
          }
          this.loading = false; // Set loading to false after async operation completes
        });
    }
  }
  
  resetAuthentication() {
    this.authFailed = true;
    this.loginForm.reset();
  }verifyChangesAndConfirm(): boolean {
    return !this.loginForm.dirty || window.confirm('You have unsaved changes. Do you really want to leave?');
  }
}
