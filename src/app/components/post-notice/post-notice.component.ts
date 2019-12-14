import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore'; 

@Component({
  selector: 'app-post-notice',
  templateUrl: './post-notice.component.html',
  styleUrls: ['./post-notice.component.scss']
})
export class PostNoticeComponent implements OnInit {

  userId: String
  myForm: FormGroup
  message: String 
  constructor(public fb: FormBuilder) {
    this.myForm = fb.group({
      title: ['', Validators.required],
      notice: ['',Validators.min(10)]
    })
   }

   onSubmit(form){
      this.userId = firebase.auth().currentUser.uid
      firebase.firestore().collection('Notices').add({
        owner: this.userId,
        created: firebase.firestore.FieldValue.serverTimestamp(),
        title: form.value.title,
        notice: form.value.notice
      }).then( () => { this.message = "Notice Posted" } ).catch( (error) => { console.log(error)})
   }
  ngOnInit() {
  }

}
