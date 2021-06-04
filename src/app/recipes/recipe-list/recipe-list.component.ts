import { Component, OnInit, Output, EventEmitter, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { Recipe } from "../recipe.model";
import { RecipeService } from "../recipe.service";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"],
})
export class RecipeListComponent implements OnInit,OnDestroy {
  recipes: Recipe[]
  sub : Subscription
  constructor(private recipeService:RecipeService) {}

  ngOnInit() {
    //this.recipes = this.recipeService.getRecipes()
    
    this.sub = this.recipeService.getRecipes().subscribe( recipes => {
      this.recipes = recipes
    })
    
  }

  ngOnDestroy(){
    //this.sub.unsubscribe()
  }

}
