import { ThrowStmt } from "@angular/compiler";
import { Component, OnChanges, OnInit } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "./shopping-list.service";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[]
  
  constructor(private shoppingListService : ShoppingListService) {}

  ngOnInit() {
    this.shoppingListService.getIngredients().subscribe(i => {
      this.ingredients = i
    })
    
  }
  pushIngredient(ingredient){
    this.ingredients.push(ingredient)
    //console.log(ingredient)
  }
}
