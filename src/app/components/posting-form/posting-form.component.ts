import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-posting-form',
  templateUrl: './posting-form.component.html',
  styleUrls: ['./posting-form.component.scss']
})
export class PostingFormComponent implements OnInit {

@Output('internshipCreated') internshipCreated = new EventEmitter();
  
  userId
  myForm: FormGroup
  constructor(public fb: FormBuilder) {
    this.myForm = this.fb.group({
      title: ['',Validators.required],
      branch: ['',Validators.required],
      year: ['',Validators.required],
      company: ['',Validators.required],
      startDate: ['',Validators.required],
      stipend: ['',Validators.required],
      details: ['', Validators.required],
      applyBy: ['',Validators.required],
      location: ['',Validators.required]
    })
   }
   
  ngOnInit() {
  }

  onSubmit(form){
    this.userId = firebase.auth().currentUser.uid
    firebase.firestore().collection('internships').add({
      title: form.value.title,
      branch: form.value.branch,
      location: form.value.location,
      startDate: form.value.startDate,
      applyBy: form.value.applyBy,
      company: form.value.company,
      stipend: form.value.stipend,
      details: form.value.details,
      created: firebase.firestore.FieldValue.serverTimestamp(),
      owner: this.userId
      }).then( () => { console.log('posted')
                       this.internshipCreated.emit('posted') } ).catch( (error) => { console.log(error)} )
    }

}



