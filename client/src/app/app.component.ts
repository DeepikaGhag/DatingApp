import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApplicationService } from 'src/Services/application.service';
import { User } from './models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'The Dating App';
  users:any;
  constructor(private http: HttpClient, private applicationService : ApplicationService){

  }

  ngOnInit()  {
    this.getUsers();
    this.setCurrentUser();
  }
  
setCurrentUser(){
  const user : User = JSON.parse(localStorage.getItem('user'));
  this.applicationService.setCurrentUser(user);
}
  getUsers() : void {
    this.http.get('https://localhost:5001/api/users').subscribe(
      response => {
        this.users = response;
    },
    error => {
      console.log(error);
    }
  );    
}
  
}
