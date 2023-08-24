import { inject,Injectable } from '@angular/core';
import { RecipeDataService } from './recipe-data.service';
import {  ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model'



export const RecipesResolverService: ResolveFn<Recipe[]> =
(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(RecipeDataService).fetchData();
};

 




