import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import * as firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: any = {}
  internships: any[] = []
  isFaculty: Boolean = false
  isStudent: Boolean = false
  constructor(public activatedRoute: ActivatedRoute) {
    let userId = this.activatedRoute.snapshot.paramMap.get('id')
    firebase.firestore().collection('users').doc(userId).get().then( (querySnapshot) => {
      this.user = querySnapshot.data()
      if( (this.user.role == 'faculty' && this.user.isApproved == true) || this.user.role == 'HOD' ){
        this.isFaculty = true
        this.isStudent = false
      }
      if(this.user.role == 'student'){
        this.isStudent = true
        this.isFaculty = false
      }
      console.log(this.isStudent)
      this.user.displayName = this.user.firstName + " " + this.user.lastName
      this.user.hobbies = this.user.hobbies.split(',')
      if(this.isFaculty == true){
        this.getInternships(userId)
      }
      console.log(this.isStudent)
      if(this.isStudent == true){
        this.getAppliedinternships(userId)
      }
    })
    
      
  }

  getInternships(userId){
    firebase.firestore().collection('internships').where('owner', '==', userId).get()
    .then( (querySnapshot) => {
      this.internships = querySnapshot.docs
      console.log(this.internships)
    })
  }

  getAppliedinternships(userId){
    firebase.firestore().collection('Applications').where('Student', '==', userId).get().then( (querySnapshot) => {
      querySnapshot.docs.forEach( (doc) => {
        let internshipId = doc.data().Internship
        let studentId = doc.data().student
        firebase.firestore().collection('internships').doc(internshipId).get().then( (data) => {
          this.internships.push(data)
        })
      })
    })
  }

  ngOnInit() {
  }

}
