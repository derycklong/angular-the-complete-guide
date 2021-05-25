import { ThrowStmt } from "@angular/compiler";
import { Component, OnInit } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    {
      name: "Apples",
      amount: 5,
    }
  ];
  
  constructor() {}

  ngOnInit(): void {
    
  }
  pushIngredient(ingredient){
    this.ingredients.push(ingredient)
    //console.log(ingredient)
  }
}
