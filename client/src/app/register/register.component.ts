import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApplicationService } from 'src/Services/application.service';
import { User } from '../models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model:any = {};

  @Input() usersfromHomeComponent;
  @Output() cancelRegister = new EventEmitter();

  constructor(private http:HttpClient,private accountService : ApplicationService) { }

  ngOnInit(): void {
  }
  register() {
    this.accountService.register(this.model).subscribe(response => {
      console.log(response);
      this.cancel();
    }, error => {
      console.log(error);
    })
  }
  cancel(){
    this.cancelRegister.emit(false);
  }
}
