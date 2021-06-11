import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Recipe } from "./recipe.model";

@Injectable({
  providedIn: "root",
})
export class RecipeService {
  test : number
  private recipes: Recipe[] = [
    {
      id: 1,
      name: "Fillet o Fish",
      description: "The catch of the day is sure a great catch at McDonald’s. A fish filet, smothered with tangy tartar sauce and half a slice of cheese between tender steamed buns is simply pure ocean heaven. ",
      imagePath:
        "https://d1nqx6es26drid.cloudfront.net/app/uploads/2015/04/04113347/FOF-350x350.png",
      ingredients: [
        { name: "Bun", amount: 2 },
        { name: "Fillet Patty", amount: 1 },
        { name: "Chips", amount: 20 },
      ],
    },
    {
      id: 2,
      name: "Big Mac",
      description: "Since its introduction in 1968, the Big Mac™ has grown to become an icon for burger lovers everywhere. Our two all-beef patties, special sauce, lettuce, cheese, pickles, onions on a sesame seed bun recipe makes a one-of-a-kind experience.",
      imagePath:
        "https://d1nqx6es26drid.cloudfront.net/app/uploads/2015/04/04043402/product-big-mac.png",
      ingredients: [
        { name: "Bun", amount: 3 },
        { name: "Beef Patty", amount: 1 },
        { name: "Lettuce", amount: 5 },
        { name: "Fries", amount: 20 },
      ],
    },
  ];

  getRecipes(): Observable<Recipe[]> {
    return of(this.recipes);
  }

  getRecipe(id:number): Recipe {
    console.log(typeof(id))
    return this.recipes.find(r => r.id === +id)
  }

  addRecipe(recipe:Recipe) : number{
    recipe.id = this.recipes[this.recipes.length -1].id + 1
    this.recipes.push(recipe)

    return recipe.id
  }

  updateRecipe(id:number,updatedRecipe:Recipe){
    let updateItem = this.recipes.find(recipe => recipe.id === +id)
    let index = this.recipes.indexOf(updateItem)
    console.log(index)
    console.log(updatedRecipe)
    this.recipes[index] = updatedRecipe
  }

  deleteRecipe(id:number){
    
    let updateItem = this.recipes.find(recipe => recipe.id === +id)
    let index = this.recipes.indexOf(updateItem)
    
    this.recipes.splice(index,1)
  }
}
