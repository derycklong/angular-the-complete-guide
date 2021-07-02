import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { exhaustMap, map, take } from "rxjs/operators";
import { AuthService } from "src/app/auth/auth.service";


@Component({
  templateUrl:'./recipe-start.component.html'
})

export class RecipeStartComponent implements OnInit, OnDestroy {
  private email: string
  private authSub: Subscription

  constructor(private authService:AuthService){}
  ngOnInit(){
    this.authSub = this.authService.user.subscribe(user => {
      this.email = user.email
    })
    
  }

  ngOnDestroy(){
    this.authSub.unsubscribe()
  }

  

}