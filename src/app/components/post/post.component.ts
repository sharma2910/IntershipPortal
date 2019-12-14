import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import * as firebase from 'firebase';
import 'firebase/auth'
import 'firebase/firestore'

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input('internship') internship: any ;
  @Input() int: any;
  @Input('uid') uid : String;
  @Output('onDelete') onDelete = new EventEmitter();
 
  id: string
  user: any = {}
  constructor() {
    this.user = firebase.auth().currentUser    
  }

  Delete(){
    console.log('delete clicked')
    firebase.firestore().collection('internships').doc(""+this.uid).delete().then( () => {
      this.onDelete.emit();
    });
  }

  ngOnInit() {
    
  }

}
