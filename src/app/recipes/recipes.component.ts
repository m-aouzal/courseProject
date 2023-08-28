import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipesService } from './recipes.service';
import { ActivatedRoute, Params, RouterOutlet } from '@angular/router';
import { RecipesListComponent } from './recipes-list/recipes-list.component';

@Component({
    selector: 'app-recipes',
    templateUrl: './recipes.component.html',
    styleUrls: ['./recipes.component.css'],
    standalone: true,
    imports: [RecipesListComponent, RouterOutlet]
})
export class RecipesComponent {

  
 

}
