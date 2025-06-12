import {Component, OnInit} from '@angular/core';
import {UserStoreService} from "@app/user/services/user-store.service";
import {AuthService} from "@app/auth/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'courses-app';
  isLoggedIn = false;
  userName = "";

  constructor(private userStoreService: UserStoreService,
              private authService: AuthService,
              private router:Router) {
  }

  ngOnInit(): void{
    this.userStoreService.getUser();
    this.authService.isAuthorized$.subscribe(isAuthorised => { this.isLoggedIn = isAuthorised;});
    this.userStoreService.name$.subscribe(name => { this.userName = name;});
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']).catch(() => {});
  }
}
