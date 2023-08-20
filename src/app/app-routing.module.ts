import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { RecipeComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { RecipesListComponent } from './recipes/recipes-list/recipes-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipesDetailComponent } from './recipes/recipes-detail/recipes-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';

// Import your components that you want to route to
;

// Define your routes
const routes: Routes = [
  { path: '404', component: PageNotFoundComponent },
  { path: '', redirectTo: '/recipes', pathMatch: "full" },       // Default route
  {
    path: 'shoppingList', component: ShoppingListComponent,
    children: [
      { path: 'shoppingEdit', component: ShoppingEditComponent }]
  }, // Route for the Shopping List page
  {
    path: 'recipes', component: RecipeComponent, children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeEditComponent },
      { path: ':id', component: RecipesDetailComponent },
      { path: ':id/edit', component: RecipeEditComponent }
      ]
  },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
