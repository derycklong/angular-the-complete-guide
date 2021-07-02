import { computeMsgId, ThrowStmt } from "@angular/compiler";
import { Component, KeyValueDiffers, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";


@Component({
  selector:'app-auth',
  templateUrl:'./auth-component.html',
  styleUrls: ['./auth-component.css']

})

export class AuthComponent implements OnInit{

  isLoginMode = true
  loginGroup: FormGroup
  isLoading = false
  error: string = null

  constructor(private formBuilder:FormBuilder, private authService:AuthService, private router:Router){}

  ngOnInit(){
    const emailPattern = '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,63}'
    this.loginGroup = this.formBuilder.group({
      email: new FormControl('', [Validators.required,Validators.email]),
      password: new FormControl('', Validators.required)
    })

  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: FormGroup){
    this.error=null
    if (!this.loginGroup.valid){
      
    }

    const email = form.controls['email'].value
    const password = form.controls['password'].value

    this.isLoading = true

    if (this.isLoginMode){

      this.authService.login(email,password).subscribe(response => {
        console.log(response)
        this.isLoading = false
        this.router.navigate(['/recipes'])
      },error => {
        this.error = error
        this.isLoading = false
      })

    }else{
      this.authService.signUp(email,password).subscribe(response => {
        console.log(response)
        this.isLoading = false
        this.router.navigate(['/recipes'])
      },error=>{
        console.log(error)
        this.error = error
        this.isLoading = false
      })
    }

    form.reset()
    
  }

}