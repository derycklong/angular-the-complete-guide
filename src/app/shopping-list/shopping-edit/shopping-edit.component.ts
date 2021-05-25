import { Component, OnInit, Output,EventEmitter } from '@angular/core';

import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @Output() ingredientOut = new EventEmitter<Ingredient>();
  constructor() { }

  ngOnInit(): void {
  }

  onAdd(name,amount){
    let ingredient: Ingredient = {
        name : name,
        amount : amount
    }
    this.ingredientOut.emit(ingredient)
    console.log(ingredient)
  }

}
