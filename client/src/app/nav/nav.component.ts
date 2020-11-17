import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {ApplicationService} from "../../Services/application.service"
import { User } from '../models/User';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  loginModel:any={}

  constructor(public applicationService : ApplicationService) { }

  ngOnInit(): void {
    
  }
  login(){
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
    this.applicationService.logout();
  }
  }

