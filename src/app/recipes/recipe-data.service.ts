import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipesService } from './recipes.service';
import { Subscription } from 'rxjs';
import { map, tap, exhaustMap, take } from 'rxjs/operators';
import { Recipe } from './recipe.model';
import { UsersloginService } from '../login/users.login.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeDataService {
  url = 'https://recipes-book-9d6f4-default-rtdb.firebaseio.com';
  dataSub: Subscription = new Subscription();
  recipes: Recipe[] = [];

  //implements  OnInit,OnDestroy

  constructor(
    private http: HttpClient,
    private recipesService: RecipesService,
    private userLoginService: UsersloginService
  ) {}

  saveData() {
    this.recipes = this.recipesService.getRecipes();
    this.dataSub = this.http
      .put(this.url + '/recipes.json', this.recipes)
      .subscribe((response) => console.log(response));
  }
  fetchData() {
    return this.http.get<Recipe[]>(this.url + '/recipes.json').pipe(
      map((response) => {
        const recipes = [];
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            recipes.push({ ...response[key], id: key });
          }
        }
        return recipes;
      }),
      tap((recipes) => {
        this.recipesService.SetData(recipes);
      })
    );
  }

  deleteRecipe(recipe: Recipe) {
    this.http.delete(this.url + '/recipes/' + recipe.id + '.json').subscribe();
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.http
      .put(this.url + '/recipes/' + recipe[index].id + '.json', recipe)
      .subscribe();
  }

  getRecipes() {
    return this.recipes;
  }
}
