import { Component, OnInit } from '@angular/core';
import {ApplicationService} from "../../Services/application.service"

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  loggedIn:any;
  loginModel:any={}

  constructor(private applicationService : ApplicationService) { }

  ngOnInit(): void {
  }
  login(){
    this.loggedIn = true;
    this.applicationService.login(this.loginModel)
      .subscribe(response => {
        console.log(response);
      },
      error => {
      console.error(error);
      }
    
      );
    
  }
  logout():void{
    this.loggedIn = false;
  }
}
