import { Component, OnInit } from "@angular/core";
import {
  Form,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { of } from "rxjs";
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
  submitRecipe: Recipe = {};
  submitIngredients: Ingredient = {};
  ingredients = new FormArray([]);

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = +params["id"];
      this.editMode = params["id"] != null;
    });

    this.initForm();
  }

  private initForm() {

    const loadRecipe: Recipe = this.recipeService.getRecipe(this.id);

    if (this.editMode === true) {
      if (loadRecipe["ingredients"]) {
        console.log(loadRecipe.ingredients);
        for (let ingre of loadRecipe.ingredients) {
          this.ingredients.push(
            this.formBuilder.group({
              name: new FormControl(ingre.name,Validators.required),
              amount: new FormControl(ingre.amount,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)]),
            })
          );
        }
      }
    }

    this.recipeGroup = this.formBuilder.group({
      name: new FormControl("", Validators.required),
      imagePath: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      // ingredient: new FormControl("", Validators.required),
      // amount: new FormControl("", Validators.required),
      ingredients: this.ingredients,
    });



    console.log(this.recipeGroup)

    if (this.editMode === true) {
      this.recipeGroup.controls["name"].setValue(loadRecipe.name);
      this.recipeGroup.controls["imagePath"].setValue(loadRecipe.imagePath);
      this.recipeGroup.controls["description"].setValue(loadRecipe.description);
    }
  }

  onAddIngredient() {
    (<FormArray>this.recipeGroup.get("ingredients"))
      .push(
        this.formBuilder.group({
          name: new FormControl("",Validators.required),
          amount: new FormControl("",[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)]),
        })
      );
  }
  onRemoveIngredient(id: number){
    (<FormArray>this.recipeGroup.get("ingredients")).removeAt(id)
  }

  onCancel(){
    this.router.navigate(['/recipes',this.id])
  }

  onSubmit() {
    this.submitRecipe.id = null;
    this.submitRecipe.name = this.recipeGroup.controls["name"].value;
    this.submitRecipe.imagePath = this.recipeGroup.controls["imagePath"].value;
    this.submitRecipe.description = this.recipeGroup.controls["description"].value;
    this.submitRecipe.ingredients = (<FormArray>this.recipeGroup.controls["ingredients"]).value

    console.log(this.submitRecipe)

    if (this.editMode === true) {
      this.submitRecipe.id = this.id;
      this.recipeService.updateRecipe(this.id, this.submitRecipe);
      this.router.navigate(['/recipes',this.submitRecipe.id])
    } else {
      const id = this.recipeService.addRecipe(this.submitRecipe);
      this.router.navigate(['/recipes',id])
    }
    //
  }
}
