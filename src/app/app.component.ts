import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import 'firebase/auth'
import 'firebase/firestore'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'IntershipPortal';
  user: any ;
  isFaculty: Boolean
  async getProfile(userId) {
    firebase.firestore().collection('users').doc(userId).get().then( async (data) => {
      this.user = await data.data()      
      if( data.data().role == 'faculty' && data.data().isApproved == true ){
        this.isFaculty = true
      }else{
        this.isFaculty = false
      }
      // console.log(this.isFaculty)
    }).catch( (error) => {
      console.log(error)
    })
  }

}
