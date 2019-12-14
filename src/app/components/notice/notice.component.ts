import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore'

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.scss']
})
export class NoticeComponent implements OnInit {

  notices: any[] 
  userId: String = ""
  user: any
  constructor() {
    this.user = firebase.auth().currentUser 
    this.getNotices()
  }

  getNotices() {
    firebase.firestore().collection('Notices').get().then( (querySnapshot) => {
      this.notices = querySnapshot.docs
    }).catch( (error) => {console.log(error)} )
    console.log(this.notices)
  }

  Delete(notice) {
    firebase.firestore().collection('Notices').doc(notice).delete().then( () => {
      this.notices = []
      this.getNotices()
    }).catch( (error) => {console.log(error)} )
  }
  ngOnInit() {
  }

}
