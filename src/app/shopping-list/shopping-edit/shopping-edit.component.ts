import { Component, OnInit, Output,EventEmitter, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  shoppingListForm : FormGroup
  forbiddenNames = ['test','testing']
  subscription : Subscription
  editMode = false
  editedItemIndex : number
  editedItem : Ingredient

  constructor(private shoppingListService : ShoppingListService) { }

  ngOnInit(): void {
    //creating a new formgroup
    this.shoppingListForm = new FormGroup({
      name: new FormControl('', [Validators.required,this.forbiddenName.bind(this)]),
      amount: new FormControl('',[Validators.required,Validators.pattern('^[1-9]+[0-9]*$')])
    })

    this.subscription = this.shoppingListService.startedEditing.subscribe(index => {
      this.editMode = true
      this.editedItemIndex = index
      this.editedItem = this.shoppingListService.getIngredient(this.editedItemIndex)

      //Setting the control Value
      this.shoppingListForm.controls['name'].setValue(this.editedItem.name)
      this.shoppingListForm.controls['amount'].setValue(this.editedItem.amount)
    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

  onAdd(){
    let ingredient: Ingredient = {
        name : this.shoppingListForm.controls['name'].value,
        amount : +this.shoppingListForm.controls['amount'].value
    }
    if (this.editMode != true)
      this.shoppingListService.addIngredient(ingredient)
    this.shoppingListService.updateIngredient(ingredient,this.editedItemIndex)

    //console.log(this.shoppingListForm)
  }

  onClear(){
    this.editMode = false
    this.editedItemIndex = null
    this.editedItem = null
    this.shoppingListForm.reset()
  }

  onDelete(){

    this.shoppingListService.deleteIngredient(this.editedItemIndex)

    this.editMode = false
    this.editedItemIndex = null
    this.editedItem = null
    this.shoppingListForm.reset()
  }

  forbiddenName(control: FormControl): { [s:string] : boolean } {
    if (this.forbiddenNames.indexOf(control.value) !== -1){
      return { 'nameIsForbidden' : true}
    }
    return null

  }
  
  
  

}
