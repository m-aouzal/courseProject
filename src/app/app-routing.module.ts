import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipesDetailComponent } from './recipes/recipes-detail/recipes-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { LoginComponent } from './login/login.component';

// Import your components that you want to route to
import { blockLoginGuard } from './guards/block-login.guard';
import { AuthGuard } from './guards/auth-can-activate.guard';
import { authDeActivateGuard } from './guards/auth-de-activate.guard';
import { authCanActivateChildrenGuard } from './guards/auth-can-activate-children.guard';

import { RecipesResolverService } from './recipes/RecipesResolver.service';

const routes: Routes = [
  {
    path: 'login',
    // canActivate: [blockLoginGuard],
    component: LoginComponent,
  },
  { path: '404', component: PageNotFoundComponent },
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'shoppingList',
    // canDeactivate: [authDeActivateGuard],
    component: ShoppingListComponent,
    // canActivate: [AuthGuard], // Apply the AuthGuard to this route
    children: [
      {
        path: 'shoppingEdit',

        component: ShoppingEditComponent,
      },
    ],
  },
  {
    path: 'recipes',
    component: RecipesComponent,
    canActivate: [AuthGuard],
    // canActivateChild: [authCanActivateChildrenGuard],
     resolve: { isResolved: RecipesResolverService },
    // Apply the AuthGuard to this route
    children: [
      { path: '', component: RecipeStartComponent },
      {
        path: 'new',
        canDeactivate: [authDeActivateGuard],
        // resolve: [RecipesResolverService ],
        component: RecipeEditComponent,
      },
      {
        path: ':id',
        resolve: [RecipesResolverService],
        component: RecipesDetailComponent,
      },
      {
        path: ':id/edit',
        resolve: [RecipesResolverService],
        canDeactivate: [authDeActivateGuard],
        component: RecipeEditComponent,
      },
    ],
  },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
