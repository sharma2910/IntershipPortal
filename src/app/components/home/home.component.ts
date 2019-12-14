import { Component, OnInit, Output } from '@angular/core';
import * as firebase from 'firebase';
import 'firebase/auth'
import 'firebase/firestore'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})



export class HomeComponent implements OnInit {

  inter: any 
  internships: any[] = [];
  user: any = {}
  userId: string;
  name: string
  role: string
  isFaculty: Boolean = false;
  userName: string
  isHOD: Boolean = false
 
  constructor() {
    this.userId = firebase.auth().currentUser.uid
    this.getProfile(this.userId)
    this.getInternships()
  }

 async getProfile(userId) {
    firebase.firestore().collection('users').doc(userId).get().then( async (data) => {
      this.user = await data.data()
      // console.log(this.user)
      this.userName = data.data().firstName + " " +data.data().lastName      
      if( data.data().role == 'faculty' && data.data().isApproved == true ){
        this.isFaculty = true
      }else if( data.data().role == 'HOD' ){
        this.isFaculty = true
        this.isHOD = true
      }else{
        this.isFaculty = false
        this.isHOD = false
      }
      // console.log(this.isFaculty)
      
    }).catch( (error) => {
      console.log(error)
    })
  }

  async getInternships(){
    firebase.firestore().collection('internships')
    .get().then( (querySnapshot) => {
      // console.log(querySnapshot.docs);
      this.internships = querySnapshot.docs;
    })
    .catch( error => {
      console.log(error)
    } )
  }

  onInternshipCreated(){
    this.internships = []
    this.getInternships()
  }

  onInternshipDeleted(){
    this.internships = []
    this.getInternships()
  }



  ngOnInit() {
  }  

}