import { Component, OnInit, NgZone } from '@angular/core';
import * as firebase from 'firebase';
import 'firebase/firestore'
import 'firebase/auth'
import { ActivatedRoute } from '@angular/router'; 

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  user: any 
  internship: any = {}
  postId: String = ""
  message: String
  isFaculty: Boolean = false
  list: any[] = []
  studentName: string = ""
  StudentPRN: number 
  constructor(public activatedRoute: ActivatedRoute,public ngZone: NgZone) {
    
    let postId = this.activatedRoute.snapshot.paramMap.get('internshipId')
    
    this.postId = postId
    
    firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get().then( (data) => {
      this.user = data.data()
      if( (data.data().role == 'faculty' && data.data().isApproved == true) || data.data().role == 'faculty' ){
        this.isFaculty = true
      }else {
        this.isFaculty = false
      }
    })

    firebase.firestore().collection('internships').doc(postId).get().then( (docSnapshot) => {
      this.ngZone.run( () => {
        this.internship = docSnapshot.data()
      })
    })
   }

   onApplyClicked(){

    
    firebase.firestore().collection('Applications').where('Student', '==', firebase.auth().currentUser.uid).where('Internship', '==', this.activatedRoute.snapshot.paramMap.get('internshipId'))
    .get()
    .then( (querySnapshot) => {
       firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get()
       .then( (user) => {
          console.log(user.data().PRN)
          firebase.firestore().collection('internships').doc(this.activatedRoute.snapshot.paramMap.get('internshipId')).get()
          .then( (internship) => {    
            if(querySnapshot.docs.length == 0){
              firebase.firestore().collection('Applications').add({
              Student: firebase.auth().currentUser.uid,
              Internship: this.postId,
              appliedOn: firebase.firestore.FieldValue.serverTimestamp(),
              ApplicationStatus: "Applied",
              studentName: user.data().firstName + "  " + user.data().firstName,
              PRN: user.data().PRN,
              intershipName: internship.data().title + " internship By " + internship.data().company
              }).then( () => { 
              alert("Application Sent" ) 
              this.message = "Application Sent" })
            }else{
              alert('Already Applied')
            }  
          })
       }) 
    })
   }

  ngOnInit() {
  }
}
