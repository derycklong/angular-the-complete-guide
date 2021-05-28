import { Injectable, OnInit, EventEmitter } from "@angular/core";
import { Recipe } from "./recipe.model";

@Injectable({
  providedIn: "root",
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    {
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

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }
}
