import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { blockLoginGuard } from './guards/block-login.guard'

// Import your components that you want to route to
const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
      canActivate: [blockLoginGuard]
  },

  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'shoppingList',
    loadComponent: () =>
      import('./shopping-list/shopping-list.component').then(
        (m) => m.ShoppingListComponent
      ),
  },
  {
    path: 'recipes',
    loadChildren: () =>
      import('./recipes/recipes.module').then((m) => m.RecipesModule),
  },
  { path: '404', component: PageNotFoundComponent },

  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
