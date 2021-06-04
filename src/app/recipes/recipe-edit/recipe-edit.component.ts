import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Ingredient } from "src/app/shared/ingredient.model";
import { RecipeStartComponent } from "../recipe-start/recipe-start.component";
import { Recipe } from "../recipe.model";
import { RecipeService } from "../recipe.service";

@Component({
  templateUrl: "./recipe-edit.component.html",
  styleUrls: ["./recipe-edit.component.css"],
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode: boolean = false;
  recipeGroup: FormGroup;
  submitRecipe: Recipe = {}
  submitIngredients: Ingredient = {};

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = +params["id"];
      this.editMode = params["id"] != null;
    });

    this.initForm();
  }

  private initForm() {
    this.recipeGroup = new FormGroup({
      name: new FormControl("", Validators.required),
      imagePath: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      ingredient: new FormControl("", Validators.required),
      amount: new FormControl("", Validators.required),
    });

    if (this.editMode === true){
      const loadRecipe:Recipe = this.recipeService.getRecipe(this.id)

      this.recipeGroup.controls["name"].setValue(loadRecipe.name)
      this.recipeGroup.controls["imagePath"].setValue(loadRecipe.imagePath)
      this.recipeGroup.controls["description"].setValue(loadRecipe.description)
    }
  }

  onSubmit() {
    this.submitIngredients.name = this.recipeGroup.controls["ingredient"].value
    this.submitIngredients.amount = this.recipeGroup.controls["amount"].value
    
    this.submitRecipe.id = null;
    this.submitRecipe.name = this.recipeGroup.controls["name"].value
    this.submitRecipe.imagePath = this.recipeGroup.controls["imagePath"].value
    this.submitRecipe.description = this.recipeGroup.controls["description"].value
    this.submitRecipe.ingredients = new Array(this.submitIngredients)

    console.log(this.submitRecipe);
    if (this.editMode === true){
      this.submitRecipe.id = this.id
      this.recipeService.updateRecipe(this.id,this.submitRecipe)
    }
    else{
      this.recipeService.addRecipe(this.submitRecipe);
    }
    
  }
}
