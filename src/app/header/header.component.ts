import { Component} from '@angular/core';
import { UsersloginService } from '../login/users.login.service';
import { Router } from '@angular/router';
@Component({
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    selector: 'app-header'
}
)
export class HeaderComponent {
    collapsed = true;
    constructor(private usersService: UsersloginService, private router: Router) { }
   
    logout(){
        this.usersService.logout();
        this.router.navigate(['/login']);
    }

    
}
