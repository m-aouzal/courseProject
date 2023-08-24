import { Component} from '@angular/core';
import { UsersloginService } from '../login/users.login.service';
import { Router } from '@angular/router';
import { RecipesService } from '../recipes/recipes.service';
import { RecipeDataService } from '../recipes/recipe-data.service';
@Component({
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    selector: 'app-header'
}
)
export class HeaderComponent {
    collapsed = true;
    constructor(private usersService: UsersloginService,
        private router: Router,
        private recipesDataService : RecipeDataService) { }
   
    logout(){
        this.usersService.logout();
        this.router.navigate(['/login']);
    }

    saveData(){
        this.recipesDataService.saveData();
    }

    fetchData(){
        this.recipesDataService.fetchData().subscribe();
    }

    
}
