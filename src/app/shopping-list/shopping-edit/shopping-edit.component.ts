import { Component, EventEmitter, ViewChild, ElementRef, Output } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {



  constructor(private shoppingListService: ShoppingListService) { }
  @ViewChild("ingredientName") ingredientNameRef: ElementRef = new ElementRef(null);
  @ViewChild("ingredientAmount") ingredientAmountRef: ElementRef = new ElementRef(null);

  addIngredient() {
    this.shoppingListService.addNewIngredient(new Ingredient(this.ingredientNameRef.nativeElement.value, this.ingredientAmountRef.nativeElement.value));

  }


}
