import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationDuration: any
  
  

  constructor(private http: HttpClient,private router:Router) {}

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDabXtrj3_VokYpxh6xXC5c-byWQOWkfTw",
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuth(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDabXtrj3_VokYpxh6xXC5c-byWQOWkfTw",
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuth(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  autoLogin(){
    const userData = JSON.parse(localStorage.getItem('userData'))
    if (!userData){
      return;
    }
    const loadUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate))

    if (loadUser.token){
      this.user.next(loadUser)
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
      this.autoLogout(expirationDuration)
    }
  }

  logout(){
    this.user.next(null)
    localStorage.setItem('userData',null)
    if(this.tokenExpirationDuration){
      clearTimeout(this.tokenExpirationDuration)
    }
    this.tokenExpirationDuration = null
    this.router.navigate(['/auth'])
  }

  autoLogout(expirationDuration: number){
    this.tokenExpirationDuration = setTimeout(()=>{
      this.logout()
    }, expirationDuration)
  }

  private handleAuth(
    email: string,
    localId: string,
    idToken: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, localId, idToken, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000)
    localStorage.setItem('userData', JSON.stringify(user))
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMsg = "An unknown error occured";
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMsg);
    }
    switch (errorRes.error.error.message) {
      case "INVALID_PASSWORD":
        errorMsg = "Invalid ID/Email. Please check.";
        break;
      case "EMAIL_NOT_FOUND":
        errorMsg = "Email not found. Please check";
        break;
      case "EMAIL_EXISTS":
        errorMsg = "Email already exist. Please login instead";
        break;
      case "WEAK_PASSWORD : Password should be at least 6 characters":
        errorMsg = "Please enter more than 6 characters for password";
        break;
    }
    return throwError(errorMsg);
  }
}
