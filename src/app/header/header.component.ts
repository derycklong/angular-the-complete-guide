import { Component, Output,EventEmitter } from '@angular/core'
import { tap } from 'rxjs/operators';
import { RecipeService } from '../recipes/recipe.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector:'app-header',
  templateUrl:'header.component.html'
})

export class HeaderComponent {
  constructor(private recipeService:RecipeService){}
  onSaveData(){
    let recipes = this.recipeService.getRecipesLocal()
    this.recipeService.storeRecipes(recipes).subscribe()

  }

  onFetchData(){
    this.recipeService.getRecipes().pipe(tap(recipes => this.recipeService.setRecipes(recipes)))
    location.reload()
    
  }

  
  
}