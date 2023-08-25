import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { UsersloginService } from './login/users.login.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  pageNotFound: boolean = false;
  loginPage: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private userService: UsersloginService, private router2: Router) { }

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.pageNotFound = event.urlAfterRedirects.includes('404');
        this.loginPage = event.urlAfterRedirects.includes('login');

      });
    // this.router.events.pipe(
    //   filter(event => event instanceof NavigationStart))
    //   .subscribe((event: NavigationStart) => {
    //     if (event.url.includes('login') && !this.userService.isAuthenticated()) {
    //       this.loginPage = true;
    //     }
    //     else if (event.url.includes('login') && this.userService.isAuthenticated()) {
    //       this.loginPage = false;
    //       this.router2.navigate(['/recipes']);
    //     }
    //   }
      // )
  }


}
