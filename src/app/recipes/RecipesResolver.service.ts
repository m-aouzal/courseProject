import { inject, Injectable } from '@angular/core';
import { RecipeDataService } from './recipe-data.service';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model'
import { RecipesService } from './recipes.service'



export const RecipesResolverService: ResolveFn<Recipe[]> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    let recipes = inject(RecipesService).getRecipes()
    if (recipes.length > 0) {
      return recipes;
    }
    else {
      return inject(RecipeDataService).fetchData();
    };
  }







