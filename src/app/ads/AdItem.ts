import { AdComponent } from "./AdComponent";
import { Type } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";



export class AdItem {
  constructor(public component: Type<AdComponent>, public data: Recipe) {}
}

