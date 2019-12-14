import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import 'firebase/auth'
import 'firebase/firestore'

@Component({
  selector: 'app-student-applications',
  templateUrl: './student-applications.component.html',
  styleUrls: ['./student-applications.component.scss']
})
export class StudentApplicationsComponent implements OnInit {

  applications: any[] = []
  constructor() { 
    this.getApplications()
  }

  getApplications(){
  
    firebase.firestore().collection('Applications').get().
    then( (querySnapshot) => {
      querySnapshot.docs.forEach( (doc) => {
        this.applications.push(doc.data())
      })
    })
  
  }


  ngOnInit() {
  }

}
