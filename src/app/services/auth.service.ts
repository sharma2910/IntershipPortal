import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public router: Router){}

  login(email: string, password:string){
    return firebase.auth().signInWithEmailAndPassword( email , password );
  }

  signUp(userObject){
    return new Promise( (resolve,reject) => {

      firebase.auth().createUserWithEmailAndPassword(userObject.email,userObject.password)
        .then( (response) => {
          resolve(response.user)
        }).catch( (error) => {
          reject(error)
        })
    })
  }

  logout() {
    firebase.auth().signOut().then( () => {
      this.router.navigate(['/Login'])
      console.log('signed Out');
    }).catch( (err)  => {
      console.log(err)
    })
  }
  

}
