import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class ShoppingEditComponent implements OnInit, OnDestroy {

  editMode: boolean = false;
  id: number;

  constructor(private shoppingListService: ShoppingListService,
    private fb: FormBuilder,
    private route: ActivatedRoute) { }
  ingredientForm: FormGroup;
  ingredientSub: Subscription;
  ingredientIndex: number;
  ingredientName: string;
  ingredientAmount: number;


  ngOnInit(): void {
    this.ingredientForm = this.fb.group({
      name: ['', Validators.required],
      amount: ['', Validators.required]
    });


    this.shoppingListService.ingredientEdited.subscribe((index: number) => {
      this.editMode = true;
      this.ingredientIndex = index;
      const ingredient = this.shoppingListService.getIngredient(index);
      this.ingredientForm.setValue({
        name: ingredient.name,
        amount: ingredient.amount
      });

    });

  }
  ngOnDestroy() {
    this.ingredientSub.unsubscribe();
  }
  addIngredient() {

    if (this.editMode) {
      this.ingredientName = this.ingredientForm.value.name;
      this.ingredientAmount = this.ingredientForm.value.amount;
      this.shoppingListService.updateIngredient(this.ingredientIndex, new Ingredient(this.ingredientName, this.ingredientAmount));
      this.editMode = false;
    }
    else {
      const ingredient = new Ingredient(this.ingredientForm.value.name, this.ingredientForm.value.amount);
      this.shoppingListService.addIngredient(ingredient);
      
    }
    this.ingredientForm.reset();
  }

  deleteIngredient(){
    this.shoppingListService.deleteIngredient(this.ingredientIndex);
    this.editMode = false;
    this.ingredientForm.reset();
  }




}