import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import 'firebase/auth';

@Injectable({
    providedIn: 'root'
})

export class FacultyApprovalService{
    ApproveApplication ( user , facultyUid ) {
        if(user.role != 'HOD') return
        firebase.firestore().collection('users').doc(facultyUid).update( () => {})
            .then( (response) => { 
                console.log('sucessfully updated ',response)
            })
            .catch( (error) => {
                console.log(error.message)
            });
    }

    RejectApplication ( user , facultyUid ) {
        if (user.role != 'HOD') return
        firebase.firestore().collection('users').doc(facultyUid).delete()
            .then((response) => {

            })
            .catch((error) => {

            })
    }
}  