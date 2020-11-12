import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private http: HttpClient) { 

  }

  login(loginModel : any) : any {
    this.http.post("https://localhost:5001/api" + "Account/Login" , loginModel);
  }

}
