import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';

const routes: Routes = [
  {
    path: '',
    // canDeactivate: [authDeActivateGuard],
    component: ShoppingListComponent,
    // canActivate: [AuthGuard], // Apply the AuthGuard to this route
    children: [
      {
        path: 'shoppingEdit',

        component: ShoppingEditComponent,
      },
      { path: '**', redirectTo: '404' }, // Wildcard route for a 404 page
    ],
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
export class ShoppingListRoutingModule {}
