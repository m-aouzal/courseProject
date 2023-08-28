import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersloginService } from '../login/users.login.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { RecipesService } from '../recipes/recipes.service';
import { RecipeDataService } from '../recipes/recipe-data.service';
import { Subscription,take } from 'rxjs';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgIf } from '@angular/common';
@Component({
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    selector: 'app-header',
    standalone: true,
    imports: [
        RouterLink,
        NgIf,
        RouterLinkActive,
        BsDropdownModule,
    ],
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  fetchDataSubscription: Subscription;
  userSub: Subscription;
  isAuthenticated = false;
  constructor(
    private usersService: UsersloginService,
    private router: Router,
    private recipesDataService: RecipeDataService,
    private userLoginService: UsersloginService
  ) {}
  ngOnInit() {
    this.userSub = this.userLoginService.userSubject.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }

  onLogout() {
    this.usersService.logout();
  
  }

  saveData() {
    this.recipesDataService.saveData();
  }
  fetchData() {
    this.recipesDataService.fetchData().pipe(
      take(1)
    ).subscribe();
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
    this.userSub.unsubscribe();
  }
}
