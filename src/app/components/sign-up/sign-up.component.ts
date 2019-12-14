import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
 
  validEmail: boolean;
  matchingPasswords: boolean
  myForm : FormGroup;
  message: String;
  userError: any ;
  isApproved: boolean;
  constructor(public router: Router,public fb: FormBuilder,public authService: AuthService) {
      this.myForm = this.fb.group({
        firstName: ['',Validators.required],
        lastName: ['',Validators.required],
        branch: ['',Validators.required],
        PRN: ['',Validators.required],
        year: ['',Validators.required],
        email: ['',Validators.required],
        password: ['',Validators.required],
        confirmPassword: ['',Validators.required],
        role: ['',Validators.required],
        
      },
      {
        validators: [this.checkMatchingPassword('password','confirmPassword'),this.checkValidEmail('email')]
      })

   }

   
   checkValidEmail(Email: string){
    return ( group: FormGroup ) => {
       let email = group.controls[Email];

       if (email.value.includes('@sitpune.edu.in')){
         this.validEmail = true;
         return
       }
       else{
         email.setErrors({
           notValid: true
         })
       }
    }
  }

  checkMatchingPassword( password: string , ch_password: string){
   return (group: FormGroup) => {

     let pass = group.controls[password];
     let ch_pass = group.controls[ch_password];
 
     if(pass.value === ch_pass.value){
       this.matchingPasswords = true;
       return
     }else{
       ch_pass.setErrors({
         notEqualToPassword: true
       })
     }

   }
  }

  onSubmit(myForm){
    this.authService.signUp(myForm.value).then( (user: any) => {
      firebase.firestore().collection('users').doc(user.uid).set({
        firstName: myForm.value.firstName,
        lastName: myForm.value.lastName,
        email: myForm.value.email,
        branch: myForm.value.branch,
        year: myForm.value.year,
        role: myForm.value.role,
        hobbies: "",
        interests: "",
        bio: "",
        PRN: myForm.value.PRN,
        isApproved: false
      }).then( () => { this.message = 'You Have Registered Sucessfully Please Login';
                      console.log(this.message)
                      this.router.navigate(['/Login'])
                      })
      
      if(myForm.value.role === "faculty"){
        firebase.firestore().collection('approvalList').doc(user.uid).set({
          name: myForm.value.firstName + " " + myForm.value.lastName,
          isApproved: false,
          appliedOn: firebase.firestore.FieldValue.serverTimestamp()
        }).then( () => {this.message="faculty added for approval" }).catch( (error) => {console.log(error)} )
      }
    }).catch( (error) => {this.userError = error; console.log(this.userError.message)})
    
  }
  
  ngOnInit() {
  }

}
