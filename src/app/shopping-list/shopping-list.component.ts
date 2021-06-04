import { ThrowStmt } from "@angular/compiler";
import { Component, OnChanges, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "./shopping-list.service";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  ingredientsSubChange: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.ingredientsSubChange = this.shoppingListService
      .getIngredients()
      .subscribe((i) => {
        this.ingredients = i;
      });
  }

  onEditItem(index){
    this.shoppingListService.startedEditing.next(index)


  }

  ngOnDestroy() {
    this.ingredientsSubChange.unsubscribe();
  }
  pushIngredient(ingredient) {
    this.shoppingListService.addIngredient(ingredient);
    //console.log(ingredient)
  }
}
