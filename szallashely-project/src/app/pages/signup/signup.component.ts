import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  
  signupForm = new FormGroup({
  username: new FormControl(''),
  password: new FormControl(''),
  email: new FormControl('')
  });
  constructor(){};
  ngOnInit(): void {
      
  }
  onSubmit(): void{
    console.log(this.signupForm);
  }
}
