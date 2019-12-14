import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import * as firebase from 'firebase'
import 'firebase/auth';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
  constructor( public router: Router ){ }

  canActivate ( 
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return new Promise ( (resolve, reject) => {
        firebase.auth().onAuthStateChanged( (user) => {
          if(user) {
            resolve(true)
          }
          else {
            this.router.navigate(['/Login']);
            resolve(false)
          }
        })
      })
  }
}