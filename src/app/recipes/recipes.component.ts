import { Component } from '@angular/core';
import {Recipe} from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipeComponent {

  recipe: Recipe = new Recipe(null, null, null);
    recipeShown : boolean = false;
  showDetail(recipe){
    this.recipeShown = true;
  }
}
