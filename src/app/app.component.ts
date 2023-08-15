import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'courseProject';
  recipeTemplate = true;
  shoppingTemplate = false;

  componentSelected : String = '';

  goToComponent(event) {
   if (event === 'recipe') {
    this.recipeTemplate = true;
    this.shoppingTemplate = false;
   }
   else {
    this.recipeTemplate = false;
    this.shoppingTemplate = true;
   }

  }

  

}
