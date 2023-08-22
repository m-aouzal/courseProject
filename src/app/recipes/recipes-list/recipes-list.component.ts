import { Component, OnInit,OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit,OnDestroy {
  recipes: Recipe[] = []; // Declare as an array of Recipe

  constructor(private recipeService: RecipesService) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.recipeService.recipeAdded.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    } );
  }
  ngOnDestroy() {
    this.recipeService.recipeAdded.unsubscribe();
  }
}
