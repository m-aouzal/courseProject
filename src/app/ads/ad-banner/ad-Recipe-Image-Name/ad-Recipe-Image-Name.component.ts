import { Component, Input } from '@angular/core';
import { AdComponent } from '../../AdComponent';
import { Recipe } from '../../../recipes/recipe.model';
import { Router, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-ad-Recipe-Image-Name',
    templateUrl: './ad-Recipe-Image-Name.component.html',
    styleUrls: ['./ad-Recipe-Image-Name.component.css'],
    standalone: true,
    imports: [RouterLinkActive]
})
export class AdRecipeImageNameComponent implements AdComponent {

  @Input() data: Recipe;
  constructor(private router : Router){}

  visiteRecipe(){
    this.router.navigate(['/recipes', this.data.id]);
  }

}

