import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, Subject } from "rxjs";
import { exhaustMap, take } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { Recipe } from "./recipe.model";

@Injectable({
  providedIn: "root",
})
export class RecipeService {
  constructor(private http:HttpClient, private authService:AuthService){}

  private recipes: Recipe[] = []
  recipesChanged = new Subject<Recipe[]>();

  setRecipes(recipes : Recipe[]){
    this.recipes = recipes
    //this.recipesChanged.next(this.recipes.slice())
    //console.log(this.recipes)
  }

  getRecipes():Observable<Recipe[]>{
    return this.http.get<Recipe[]>('https://ng-complete-guide-c62c3-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json')
    
  }

  getRecipesLocal(): Recipe[]{
    return this.recipes
  }

  storeRecipes(recipes: Recipe[]): Observable<any> {
    return this.http.put('https://ng-complete-guide-c62c3-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json',recipes)
  }

  getRecipe(id:number): Recipe {
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
    this.recipes[index] = updatedRecipe
    //firing to recipe list component 
    //this.recipesChanged.next(this.recipes)
  }

  deleteRecipe(id:number){
    
    let updateItem = this.recipes.find(recipe => recipe.id === +id)
    let index = this.recipes.indexOf(updateItem)
    this.recipes.splice(index,1)
    //firing to recipe list component
    //this.recipesChanged.next(this.recipes)
  }
}







  // private recipes: Recipe[] = [
  //   {
  //     id: 1,
  //     name: "Fillet o Fish",
  //     description: "The catch of the day is sure a great catch at McDonald’s. A fish filet, smothered with tangy tartar sauce and half a slice of cheese between tender steamed buns is simply pure ocean heaven. ",
  //     imagePath:
  //       "https://d1nqx6es26drid.cloudfront.net/app/uploads/2015/04/04113347/FOF-350x350.png",
  //     ingredients: [
  //       { name: "Bun", amount: 2 },
  //       { name: "Fillet Patty", amount: 1 },
  //       { name: "Chips", amount: 20 },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     name: "Big Mac",
  //     description: "Since its introduction in 1968, the Big Mac™ has grown to become an icon for burger lovers everywhere. Our two all-beef patties, special sauce, lettuce, cheese, pickles, onions on a sesame seed bun recipe makes a one-of-a-kind experience.",
  //     imagePath:
  //       "https://d1nqx6es26drid.cloudfront.net/app/uploads/2015/04/04043402/product-big-mac.png",
  //     ingredients: [
  //       { name: "Bun", amount: 3 },
  //       { name: "Beef Patty", amount: 1 },
  //       { name: "Lettuce", amount: 5 },
  //       { name: "Fries", amount: 20 },
  //     ],
  //   },
  // ];