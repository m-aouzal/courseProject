import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { RecipesDetailComponent } from './recipes-detail/recipes-detail.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipesResolverService } from './RecipesResolver.service';
import { AuthGuard } from '../guards/auth-can-activate.guard';
import { authDeActivateGuard } from '../guards/auth-de-activate.guard';
// import { authCanActivateChildrenGuard } from '../guards/auth-can-activate-children.guard';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
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
      { path: '**', redirectTo: '404' }
    ],
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesRoutingModule {}
