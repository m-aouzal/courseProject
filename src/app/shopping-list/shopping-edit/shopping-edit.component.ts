import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Subscriber, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  editMode: boolean = false;
  id: number;

  constructor(private shoppingListService: ShoppingListService,
    private fb: FormBuilder,
    private route: ActivatedRoute) { }
  ingredientForm: FormGroup;
  ingredientToEdit: Subscription;

  ngOnInit(): void {
    this.ingredientForm = this.fb.group({
      name: ['', Validators.required],
      amount: ['', Validators.required]
    });


    // this.ingredientToEdit = this.shoppingListService.
    // ingredientEdited.subscribe((ingredient: Ingredient) => {
    //   console.log("i me editinf ")
    //   this.editMode = true;
    //   this.ingredientForm.setValue({
    //     name: ingredient.name,
  
    //   });
    // });
  }
  // ngOnDestroy() {
  //   this.ingredientToEdit.unsubscribe();
  // }

  addIngredient() {
    const ingredient = new Ingredient(this.ingredientForm.value.name, this.ingredientForm.value.amount);
    this.shoppingListService.addIngredient(ingredient);
    this.ingredientForm.reset();
  }

  // updateIngredient(){
  //   const ingredient = new Ingredient(this.ingredientForm.value.name, this.ingredientForm.value.amount);
  //   this.shoppingListService.updateIngredient(ingredient);
  //   this.editMode = false;
  //   this.ingredientForm.reset();

  // }


}