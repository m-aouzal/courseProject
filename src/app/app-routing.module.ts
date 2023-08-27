import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { blockLoginGuard } from './guards/block-login.guard';


import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { LoginComponent } from './login/login.component';

// Import your components that you want to route to


const routes: Routes = [
  {
    path: 'login',
    canActivate: [blockLoginGuard],
    component: LoginComponent,
  },
  { path: '404', component: PageNotFoundComponent },
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {
    path: 'shoppingList',
    loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule)
  }
 

  // { path: '**', redirectTo: '404' } 
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
