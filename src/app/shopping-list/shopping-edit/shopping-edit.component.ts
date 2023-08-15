import { Component, EventEmitter, ViewChild, ElementRef, Output } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {

  @Output() addIngredientEvent: EventEmitter<Ingredient> = new EventEmitter<Ingredient>();

  
  @ViewChild("ingredientName") ingredientNameRef: ElementRef = new ElementRef(null);
  @ViewChild("ingredientAmount") ingredientAmountRef: ElementRef = new ElementRef(null);

  addIngredient() {

   const ingredientName = this.ingredientNameRef.nativeElement.value;
    const ingredientAmount = this.ingredientAmountRef.nativeElement.valueAsNumber;
    const ingredient = new Ingredient(ingredientName, ingredientAmount);
    this.addIngredientEvent.emit(ingredient);

  }


}
