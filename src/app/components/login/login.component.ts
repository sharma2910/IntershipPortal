import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as firebase from 'firebase';
import 'firebase/auth';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  validEmail: boolean;
  myForm: FormGroup;
  userError: any;
  message: String;
  user: any;
  constructor( public fb: FormBuilder, public authSerice: AuthService ) {
    
    this.myForm = this.fb.group({
      email: ['',[Validators.required] ],
      password: ['',[Validators.required , Validators.minLength(8)]]
    },
    {
      validators: this.checkIfValidEmail('email'),

    })      

    }
    checkIfValidEmail( email: string  ){
      return (group: FormGroup) => {
        let email_ch = group.controls[email]

        if(email_ch.value.includes('@sitpune.edu.in')){
          this.validEmail = true
          return
        }else{
          email_ch.setErrors({
            notValid: true
          })
        }
      }
    }

    onSubmit(myForm){
     // console.log(myForm.value)
      let email = myForm.value.email;
      let password = myForm.value.password
      this.authSerice.login(email,password).then( (data) => {
        // console.log(data);
      }).catch( (error) => {
        this.userError = error.message;
        console.log(this.userError)
      })
    }
  ngOnInit() {
  }

}
