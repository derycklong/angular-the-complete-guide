import { Injectable, Output, EventEmitter } from "@angular/core";
import { Observable, of } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

@Injectable({
  providedIn: "root",
})
export class ShoppingListService {
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

  addIngredient(ingredient) {
    if (ingredient instanceof Array) 
      this.ingredients.push(...ingredient);
    else 
      this.ingredients.push(ingredient);
  }
}
