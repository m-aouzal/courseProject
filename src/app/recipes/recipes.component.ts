import { Component,OnInit } from '@angular/core';
import {Recipe} from './recipe.model';
import { RecipesService } from './recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipeComponent {

  recipeSelected: Recipe = new Recipe(null, null, null,null);
  constructor(private recipeService:RecipesService) { }
  ngOnInit() {
    this.recipeService.recipeSelected.subscribe((recipe: Recipe) => {
      this.recipeSelected = recipe;
    });
    
  }
}
