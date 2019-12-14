import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import 'firebase/auth'
import 'firebase/firestore'
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  user: any = {}
  userId: string = ""
  constructor(public activetedRoute: ActivatedRoute) { 
    this.userId = this.activetedRoute.snapshot.paramMap.get('id')
    firebase.firestore().collection('users').doc(this.userId).get().then( (data) => {
      this.user = data.data()
    })
  }


  update(){
    firebase.firestore().collection('users').doc(this.userId).update({
      firstName: this.user.firstName,
      bio: this.user.bio,
      interests: this.user.interests,
      hobbies: this.user.hobbies
    }).then( () => { alert('updated')}).catch( (error) => {console.log(error)} )
  }
  ngOnInit() {
  }

}
