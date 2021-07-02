import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { tap } from "rxjs/operators";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";

@Injectable({
  providedIn:'root'
})


export class RecipesResolverService implements Resolve<any>{

  constructor(private recipeService:RecipeService){}

  resolve(){
    const recipes = this.recipeService.getRecipesLocal()

    //check if local recipes is loaded before loading again if not it will cause a bug if refresh at item level (http://localhost:4200/recipes/3)
    if(recipes.length === 0){
      return this.recipeService.getRecipes().pipe(tap(recipes => this.recipeService.setRecipes(recipes)))
    }
    else{
      return recipes
    }
    
  }
  
}