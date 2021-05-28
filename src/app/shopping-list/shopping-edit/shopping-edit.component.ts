import { Component, OnInit, Output,EventEmitter } from '@angular/core';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  constructor(private shoppingListService : ShoppingListService) { }

  ngOnInit(): void {
  }

  onAdd(name,amount){
    let ingredient: Ingredient = {
        name : name,
        amount : amount
    }
    this.shoppingListService.addIngredient(ingredient)
  }

}
