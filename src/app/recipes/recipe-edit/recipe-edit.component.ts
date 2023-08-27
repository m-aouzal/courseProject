import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { FormArray, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { RecipesService } from '../recipes.service';
import { Subscription } from 'rxjs';
import { Validators } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ComponentsForm } from 'src/app/ComponentsForm';
import { RecipeDataService } from '../recipe-data.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy, ComponentsForm {

  id: number;
  editMode: boolean = false;
  recipe: Recipe;
  sub: Subscription = new Subscription();
  RecipeEditForm: FormGroup = new FormGroup({});
  ingredient: Ingredient[] = [];

  constructor(private activatedRoute: ActivatedRoute,
    private recipeService: RecipesService,
    private fb: FormBuilder,
    private router: Router,
    private RecipeDataService: RecipeDataService) {
    this.RecipeEditForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      imagePath: ['', Validators.required],
      ingredientsArray: this.fb.array([])
    });
  }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      const id = +params['id']; // Convert the id parameter to a number
  
      if (!isNaN(id) && this.recipeService.getRecipeById(id)) {
        // Check if id is a valid number and recipe exists
        this.id = id;
        this.editMode = true;
  
        // Retrieve the recipe and populate the form
        this.recipe = this.recipeService.getRecipeById(this.id);
        this.populateForm(this.recipe);
      } else {
        // If id is not valid or recipe doesn't exist, navigate to the not-found page
        this.router.navigate(['/page-not-found']);
      }
    });
  }
  


  verifyChangesAndConfirm(): boolean {
    return !this.RecipeEditForm.dirty || window.confirm('You have unsaved changes. Do you really want to leave?');
  }



  populateForm(recipe: Recipe) {
    if (recipe.ingredients) {
      for (let ingredient of recipe.ingredients) {
        let ingredientItem = this.fb.group({
          name: [ingredient.name, Validators.required],
          amount: [ingredient.amount, Validators.required]
        });
        this.ingredientsArray.push(ingredientItem);
      }
      this.RecipeEditForm.patchValue({
        name: recipe.name,
        description: recipe.description,
        imagePath: recipe.imagePath
      });
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  };
  cancelEdit() {
    this.editMode = false;
    this.RecipeEditForm.reset();
    // Navigate back using a relative path
    this.router.navigate(['..'], { relativeTo: this.activatedRoute});
  }

  onSubmit() {
    const formValue = this.RecipeEditForm.value;

    const updatedIngredients = [];

    const updatedRecipe: Recipe = {
      name: formValue.name,
      description: formValue.description,
      imagePath: formValue.imagePath,
      ingredients: [...formValue.ingredientsArray]

    };


    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, updatedRecipe);
      this.router.navigate(['/recipes', this.id]);
    } else {
      this.recipeService.createRecipe(updatedRecipe);
      this.id = this.recipeService.getRecipes().length - 1;
    }

    this.RecipeEditForm.reset();
    this.router.navigate(['/recipes', this.id]);
  }


  get ingredientsArray() {
    return this.RecipeEditForm.controls['ingredientsArray'] as FormArray;
  }

  addIngredient() {
    this.ingredientsArray.push(this.fb.group({
      name: ['', Validators.required],
      amount: ['', Validators.required]
    }));
  }

  deleteIngredient(i) {
    this.ingredientsArray.removeAt(i);
  }


}
