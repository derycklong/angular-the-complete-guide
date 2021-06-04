import { Injectable, Output, EventEmitter } from "@angular/core";
import { Observable, of, Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

@Injectable({
  providedIn: "root",
})
export class ShoppingListService {
  startedEditing = new Subject<number>()

  private ingredients: Ingredient[] = [
    {
      name: "Apples",
      amount: 5,
    },
  ];
  constructor() {}

  getIngredients(): Observable<Ingredient[]> {
    return of(this.ingredients);
  }

  getIngredient(index : number){
    return this.ingredients[index]
  }

  addIngredient(ingredient) {
    if (ingredient instanceof Array) 
      this.ingredients.push(...ingredient);
    else 
      this.ingredients.push(ingredient);
  }

  updateIngredient(newIngredient: Ingredient, index:number) {
    this.ingredients[index] = newIngredient
  }

  deleteIngredient(index:number){
    console.log(this.ingredients)
    this.ingredients.splice(index,1)
    console.log(this.ingredients)
  }
}
