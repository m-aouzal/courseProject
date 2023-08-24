import { Component, OnInit,OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit,OnDestroy {
  recipes: Recipe[] = []; // Declare as an array of Recipe
  recipeSub : Subscription

  constructor(private recipeService: RecipesService) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.recipeSub =    this.recipeService.recipeAdded.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    } );
  }
  ngOnDestroy() {
    this.recipeSub.unsubscribe();
  }
}
