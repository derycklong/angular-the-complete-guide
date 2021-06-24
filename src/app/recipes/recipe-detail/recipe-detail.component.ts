import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe:Recipe
  selectedId:number
  constructor(private shoppingListService:ShoppingListService, private recipeService: RecipeService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(){
    this.route.params.subscribe(params =>{
      this.selectedId = params['id']
      this.recipe = this.recipeService.getRecipe(this.selectedId)
      console.log('detail')
    })

    
  } 


  deleteRecipe(){
    this.recipeService.deleteRecipe(this.selectedId)
    this.router.navigate(['recipes'])
  }

  sendToShoppingList(){
    this.shoppingListService.addIngredient(this.recipe.ingredients)
  }

}
