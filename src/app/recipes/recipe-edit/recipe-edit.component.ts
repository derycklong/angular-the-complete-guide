import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";


@Component({
  templateUrl:'./recipe-edit.component.html'
})

export class RecipeEditComponent implements OnInit {
  id: number
  editMode: boolean = false

  constructor(private route:ActivatedRoute){}

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.id = +params['id']
      this.editMode = params['id'] != null
    })
  }
  
}