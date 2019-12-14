import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.scss']
})
export class ApproveComponent implements OnInit {

  ApprovalList: any[] = []
  constructor() { 
    this.getApprovalList()
  }

  getApprovalList(){
    firebase.firestore().collection('approvalList').get().then( (querySnapshot) => {
      this.ApprovalList = querySnapshot.docs
      console.log(querySnapshot.docs)
    }).catch( (error) => { console.log(error)} )
  }

  accept(id){
    firebase.firestore().collection('users').doc(id).update({
      isApproved: true
    }).then( () => { 
      firebase.firestore().collection('approvalList').doc(id).delete().then( () => {
        this.ApprovalList = []
        this.getApprovalList()
        console.log('deleted')
      })
    })
      .catch( (error) => { console.log(error) } )
  }

  reject(id){
    firebase.firestore().collection('users').doc(id).delete().then( () => {
      firebase.firestore().collection('approvalList').doc(id).delete().then( () => {
        console.log('rejected And Deleted')
        this.ApprovalList = []
        this.getApprovalList()
      } )
    })
  }

  ngOnInit() {
  }

}
