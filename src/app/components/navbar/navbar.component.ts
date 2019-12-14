import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import * as firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  
  isFaculty: Boolean = false
  isHOD: Boolean = false;
  userId: any
  loggedIn: Boolean
  constructor(public authService: AuthService){
    
   firebase.auth().onAuthStateChanged( (user) => {
     if(user){
      this.loggedIn = true
      this.userId = user.uid
     firebase.firestore().collection('users').doc(""+user.uid).get().then( async (data) => {
      // console.log(this.user)
      if( data.data().role == 'faculty' && data.data().isApproved == true ){
        this.isFaculty = true
        this.isHOD = false
      }else if(data.data().role == 'HOD'){
        this.isHOD = true
        this.isFaculty = true
      }else{
        this.isHOD = false
        this.isFaculty = false
      }

       // console.log(this.isFaculty)
    }).catch( (error) => { console.log(error) } )     
     }else{
       this.loggedIn = false
     }
   })
  }

  ngOnInit() {
  }

  Logout() {
    this.authService.logout();
  }

  // getRole(userId){
  //   firebase.firestore().collection('users').doc(userId).get().then( (data) => {
  //     if(data.data().role === "faculty" && data.data().isApproved === true )
  //       this.isFaculty = true
  //     else
  //       this.isFaculty = false 
  //       console.log(this.isFaculty)
  //   }).catch( (error) => { console.log(error) } )
  // }
}