import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApplicationService } from 'src/Services/application.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
registerMode = false;
public users : any;

constructor(private http:HttpClient, private applicationService : ApplicationService) { }

  ngOnInit(): void {
  this.getUsers();    
  }

registerToggle(){
  this.registerMode = ! this.registerMode;
  this.getUsers();
}

cancelRegisterMode(event : any){
  this.registerMode = event;
}

getUsers(){
  this.http.get("https://localhost:5001/api/users")
    .subscribe(arg => this.users = arg);
  console.log(this.users);
  }
}
