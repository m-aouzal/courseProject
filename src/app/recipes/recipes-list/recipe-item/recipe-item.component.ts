import { Component,Input} from '@angular/core';
import { Recipe } from "../../recipe.model"

import { Router} from '@angular/router';


@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent  {
  @Input() recipe: Recipe = new Recipe();

  isClicked : boolean = false;



  constructor( private router :Router) { }
  onSelect(): void {
    this.router.navigate(['/recipes',this.recipe.id]);  
  };
}
