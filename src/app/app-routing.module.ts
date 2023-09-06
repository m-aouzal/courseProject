import { NgModule } from '@angular/core';
import { RouterModule, Routes,PreloadAllModules  } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

// Import your components that you want to route to
const routes: Routes = [
 
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },

  
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {
    path: 'shoppingList',
    loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule)
  },
  {
    path: 'recipes',
    loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule)
  },
  { path: '404', component: PageNotFoundComponent },

  { path: '**', redirectTo: '404' } 
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
