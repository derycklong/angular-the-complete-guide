import { Component, OnInit, Output, EventEmitter, OnDestroy, OnChanges } from "@angular/core";
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
    
      console.log('do not load this')
      this.sub = this.recipeService.getRecipes().subscribe( recipes => {
        this.recipeService.setRecipes(recipes)
        this.recipes = recipes
      })
  

    this.recipeService.recipesChanged
    .subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
        console.log('changed')
      }
    );
    
  }

  

  ngOnDestroy(){
    //this.sub.unsubscribe()
  }

}
