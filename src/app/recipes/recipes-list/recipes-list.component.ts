import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import { Subscription } from 'rxjs';
import { RecipeDataService } from '../recipe-data.service';
import { ActivatedRoute } from '@angular/router';
import { AdItem } from 'src/app/ads/AdItem';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css'],
})
export class RecipesListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = []; // Declare as an array of Recipe
  recipeSub: Subscription;
  recipesAdsItems: AdItem[];

  constructor(
    private recipeService: RecipesService,
    private recipeDataService: RecipeDataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.recipes = this.route.snapshot.data['isResolved'];
    this.recipesAdsItems = this.recipeService.getRecipesAds(this.recipes);
    this.recipeSub = this.recipeService.recipeAdded.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
        this.recipesAdsItems = this.recipeService.getRecipesAds(this.recipes);
      }
    );
  }

  ngOnDestroy() {
    this.recipeSub.unsubscribe();
  }
}
