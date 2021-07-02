import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { RecipeService } from '../recipes/recipe.service';


@Component({
  selector:'app-header',
  templateUrl:'header.component.html'
})

export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription
  isAuth = false
  private email: string

  constructor(private recipeService:RecipeService, private authService:AuthService){}

  onLogOut(){
    this.authService.logout()
  }
  ngOnInit(){
    this.userSub = this.authService.user.subscribe(user => {
      console.log(user)
      this.isAuth = !user ? false : true
      this.email = user? user.email : null
      
    });
    //this.email = JSON.parse(localStorage.getItem('userData')).email
    

  }

  ngOnDestroy(){
    this.userSub.unsubscribe()
  }

  



  
  
}