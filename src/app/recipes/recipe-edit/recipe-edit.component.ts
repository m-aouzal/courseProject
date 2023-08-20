import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../recipe.model';
import { FormsModule } from '@angular/forms';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent {

  id: number;
  editMode: boolean = false;
  recipe: Recipe = new Recipe();
  
  constructor(private activatedRoute: ActivatedRoute, private recipeService: RecipesService) {
    this.activatedRoute.params.subscribe(params => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      if (this.editMode) {
        this.recipe = this.recipeService.getRecipeById(this.id);
      }
    });
  }

  cancelEdit() {
    // Implement the cancelEdit logic
  }

  onSubmit() {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipe);
    } else {
      this.recipeService.createRecipe(this.recipe);
    }
  }

  
}
