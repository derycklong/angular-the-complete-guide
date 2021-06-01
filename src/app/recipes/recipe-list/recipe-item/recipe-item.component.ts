import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html'

})
export class RecipeItemComponent implements OnInit {
  @Input() recipe:Recipe
  
  
  constructor(private recipeService:RecipeService, private route:Router) { }

  ngOnInit(): void {
    
  }


}
