import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { Subscriber, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import * as fromAppStore from '../../store/appStore.reducer';
import * as shoppingListActions from '../store/shopping-list.actions';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  editMode: boolean = false;
  id: number;

  constructor(
    private shoppingListService: ShoppingListService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private store: Store< fromAppStore.AppState>
  ) {}
  ingredientForm: FormGroup;
  ingredientSub: Subscription;
  formSubscription: Subscription;

  ingredientName: string;
  ingredientAmount: number;

  ngOnInit(): void {
    this.ingredientForm = this.fb.group({
      name: ['', Validators.required],
      amount: ['', Validators.required],
    });

    this.formSubscription = this.ingredientForm.valueChanges.subscribe(() => {
      this.formSubscription = this.ingredientForm.valueChanges.subscribe(() => {
        const areInputsCleared = this.areFormControlsCleared();
        this.shoppingListService.setFormDirty(!areInputsCleared);
      });
    });

    this.ingredientSub = this.ingredientSub = this.store
      .select("shoppingList")
      .subscribe((state) => {
        if (state.ingIndex > -1) {
          this.editMode = true;
          const ingredient = state.ingToEdit;
          this.ingredientForm.setValue({
            name: ingredient.name,
            amount: ingredient.amount,
          });
        }
        else {
          this.editMode = false;
        }
      });

    // this.ingredientSub = this.shoppingListService.ingredientEdited.subscribe((index: number) => {
    //   this.editMode = true;
    //   this.ingredientIndex = index;
    //   const ingredient = this.shoppingListService.getIngredient(index);
    //   this.ingredientForm.setValue({
    //     name: ingredient.name,
    //     amount: ingredient.amount
    //   });
  }

  private areFormControlsCleared(): boolean {
    const formValues = this.ingredientForm.value;
    return Object.values(formValues).every(
      (value) => value === null || value === ''
    );
  }
  ngOnDestroy() {
    this.ingredientSub.unsubscribe();
    this.formSubscription.unsubscribe();
    this.store.dispatch(shoppingListActions.stopEdit());
  }
  addIngredient() {
    if (this.editMode) {
      this.ingredientName = this.ingredientForm.value.name;
      this.ingredientAmount = this.ingredientForm.value.amount;
      //this.shoppingListService.updateIngredient(this.ingredientIndex, new Ingredient(this.ingredientName, this.ingredientAmount));
      this.store.dispatch(
        shoppingListActions.updateIngredient({
          ingredient: new Ingredient(
            this.ingredientName,
            this.ingredientAmount
          ),
        })
      );
      this.editMode = false;
    } else {
      const ingredient = new Ingredient(
        this.ingredientForm.value.name,
        this.ingredientForm.value.amount
      );
      //this.shoppingListService.addIngredient(ingredient);
      this.store.dispatch(
        shoppingListActions.addIngredient({ ingredient: ingredient })
      );
    }
    this.ingredientForm.reset();
  }

  deleteIngredient() {
    this.store.dispatch(
      shoppingListActions.deleteIngredient()
    );
    this.store.dispatch(shoppingListActions.stopEdit());
    // this.shoppingListService.deleteIngredient(this.ingredientIndex);
    this.editMode = false;
    this.ingredientForm.reset();
  }

  verifyChangesAndConfirm(): boolean {
    return (
      !this.ingredientForm.dirty ||
      window.confirm('You have unsaved changes. Do you really want to leave?')
    );
  }

  onClear() {
    this.ingredientForm.reset();
    this.editMode = false;
    this.store.dispatch(shoppingListActions.stopEdit());
  }
}
