import { HttpClient } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/User';
import {map} from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
private CurrentUserSource = new ReplaySubject<User>(1);
currentUser$ = this.CurrentUserSource.asObservable();
private users : any;

constructor(private http: HttpClient) { 

  }
  register(model:any){
    return this.http.post("https://localhost:5001/api/account/register",model).pipe(
      map(
        (reponse:User) => {
          if(reponse)
            localStorage.setItem('user',JSON.stringify(reponse));
            this.CurrentUserSource.next(reponse);
          }
      )
   )
  }
  
  getUsers(){
   return this.http.get("https://localhost:5001/api/users").pipe
    (map(
      response => {
      this.users  = response;; 
    },
    error =>{
      console.log(console.error());
    }
    ))
  }
  
  login(loginModel : any) : any {
   return this.http.post("https://localhost:5001/api" + "/Account/Login" , loginModel)
    .pipe(map( (response :User)=>{
      
        const user = response;
        if(user)
        {
        localStorage.setItem('user',JSON.stringify(user));
        this.CurrentUserSource.next(user);
    }
      })
    );
  
    }


    setCurrentUser(user:User){
      this.CurrentUserSource.next(user);
    }
    
    logout()
    {
      localStorage.removeItem('user');
      this.CurrentUserSource.next(null);

    }
}
