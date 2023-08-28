
import {  Routes} from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { blockLoginGuard } from './guards/block-login.guard'

// Import your components that you want to route to
export const routes: Routes = [
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
      import('./recipes/recipes-routes')
  },
  { path: '404', component: PageNotFoundComponent },

  { path: '**', redirectTo: '404' },
];


