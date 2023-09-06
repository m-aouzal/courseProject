import { Component, OnInit, OnDestroy, Injectable } from '@angular/core';
import { UsersloginService } from '../login/users.login.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { RecipesService } from '../recipes/recipes.service';
import { RecipeDataService } from '../recipes/recipe-data.service';
import { Subscription, take } from 'rxjs';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgIf } from '@angular/common';
import { AppState } from '../store/appStore.reducer';
import { Store } from '@ngrx/store';
import * as LoginActions from '../login/store/login.actions';

@Component({
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgIf, RouterLinkActive, BsDropdownModule],
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  fetchDataSubscription: Subscription;
  userSub: Subscription;
  isAuthenticated = false;
  storeSub: Subscription;
  constructor(
    private usersService: UsersloginService,
    private router: Router,
    private recipesDataService: RecipeDataService,
    private userLoginService: UsersloginService,
    private store: Store<AppState>
  ) {}
  ngOnInit() {
    this.storeSub = this.store.select('login').subscribe((loginState) => {
      this.isAuthenticated = !!loginState.user;
    });
    // this.userSub = this.userLoginService.userSubject.subscribe((user) => {
    //   this.isAuthenticated = !!user;
    // });
  }

  onLogout() {
    this.store.dispatch(LoginActions.logout());
    this.usersService.logout();
  }

  saveData() {
    this.recipesDataService.saveData();
  }
  fetchData() {
    this.recipesDataService.fetchData().pipe(take(1)).subscribe();
  }

  //   fetchData() {
  //     this.fetchDataSubscription = this.recipesDataService
  //       .fetchData()
  //       .subscribe();
  //   }

  ngOnDestroy() {
    // Unsubscribe from the fetchData subscription during component destruction
    // if (this.fetchDataSubscription) {
    //   this.fetchDataSubscription.unsubscribe();
    // }
    this.storeSub.unsubscribe();
  }
}
