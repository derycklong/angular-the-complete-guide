import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({
    providedIn:'root'
})

export class DataStorageService{
    constructor(private http:HttpClient, private recipeService:RecipeService){}

    storeRecipes(){
        let recipes: Recipe[] = null
        let recipeSub = this.recipeService.getRecipes().subscribe((response : Recipe[]) => {
            recipes = response
            //console.log(recipes)
        });
        console.log(recipes)
        
        this.http.put('https://ng-complete-guide-c62c3-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json',recipes).subscribe(response => {
            console.log(response)
        })

    }

    fetchRecipes(){
        this.http.get<Recipe[]>('https://ng-complete-guide-c62c3-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json').subscribe(recipes=>{
            this.recipeService.setRecipes(recipes)
            console.log(recipes)
        })
    }

}