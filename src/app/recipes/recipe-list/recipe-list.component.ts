import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";

import { Recipe } from "../recipe.model";
import { RecipeService } from "../recipe.service";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[]

  @Output() recipeOut = new EventEmitter<Recipe>()

  constructor(private recipeService:RecipeService) {}

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes() 
  }

  bindRecipe(recipe){
    this.recipeOut.emit(recipe)
  }
}
