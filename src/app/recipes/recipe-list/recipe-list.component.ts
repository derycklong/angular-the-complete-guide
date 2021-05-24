import { Component, OnInit } from "@angular/core";
import { Recipe } from "../recipe.model";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    {
      name: "Elon Musk1",
      description: "Tesla",
      imagePath:
        "https://specials-images.forbesimg.com/imageserve/600ed2aa4d83b082589c3601/960x0.jpg",
    },
    {
      name: "Elon Musk2",
      description: "Tesla",
      imagePath:
        "https://specials-images.forbesimg.com/imageserve/600ed2aa4d83b082589c3601/960x0.jpg",
    }
  ];

  constructor() {}

  ngOnInit(): void {
    // this.recipes.push(
    //   {
    //     name: "Elon Musk1",
    //     description: "Tesla",
    //     imagePath:
    //       "https://specials-images.forbesimg.com/imageserve/600ed2aa4d83b082589c3601/960x0.jpg",
    //   },
    //   {
    //     name: "Elon Musk",
    //     description: "Tesla",
    //     imagePath:
    //       "https://specials-images.forbesimg.com/imageserve/600ed2aa4d83b082589c3601/960x0.jpg",
    //   }
    // );
  }
}
