import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import 'firebase/auth'


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(public router: Router) { }

  loginClicked(){
    let user = firebase.auth().currentUser
    if(user){
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/Login'])
    }
  }

  ngOnInit() {
  }

}
