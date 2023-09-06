import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import FormBuilder and other necessary modules
import { UsersloginService } from './users.login.service';
import { Router } from '@angular/router';
import { ComponentsForm } from '../ComponentsForm';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AlertComponent } from '../shared/alert/alert.component';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/appStore.reducer';
import * as LoginActions from './store/login.actions';
import { Observable, Subscription } from 'rxjs';
import { AuthResponseData } from './store/login.effects';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, AlertComponent],
  selector: 'app-login',
  templateUrl: './login.component.html', // Update with the correct template URL
  styleUrls: ['./login.component.css'], // Update with the correct style URL
})
export class LoginComponent implements ComponentsForm, OnInit, OnDestroy {
  loginForm: FormGroup; // Declare the form group
  signUpForm: FormGroup;
  authFailed: boolean = false;
  loading: boolean = false;
  loadingSignUp: boolean = false;
  loadingLogin: boolean = false;
  error: string;
  authObservable: Observable<AuthResponseData>;
  storeSub: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersloginService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {
    // Inject the FormBuilder service

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    this.storeSub = this.store.select('login').subscribe((loginState) => {
      this.loadingLogin = loginState.loadingSate;
      this.loadingSignUp = loginState.loadingSate;
      this.error = loginState.errorMessage;
    });
  }

  ngOnDestroy() {
    this.storeSub.unsubscribe();
  }
  verifyChangesAndConfirm(): boolean {
    return (
      !this.loginForm.dirty ||
      window.confirm('You have unsaved changes. Do you really want to leave?')
    );
  }

  onSubmitLogin() {
    this.loadingLogin = true;
    this.submitForm('login');
  }

  onSubmitSignUp() {
    this.loadingSignUp = true;
    this.submitForm('signUp');
  }

  onHandleError() {
    this.store.dispatch(LoginActions.clearError());
  }

  private submitForm(mode: string) {
    this.loading = true;
    const formGroup = mode === 'signUp' ? this.signUpForm : this.loginForm;
    if (formGroup.invalid) {
      this.loading = false;
      return;
    }

    const formData = formGroup.value;

    if (mode === 'login') {
      this.store.dispatch(
        LoginActions.loginStart({
          email: formData.email,
          password: formData.password,
        })
      );
    } else {
      this.store.dispatch(
        LoginActions.signupStart({
          email: formData.email,
          password: formData.password,
        })
      );
    }
    formGroup.reset();
  }
}

