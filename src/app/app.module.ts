import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import * as firebase from 'firebase';
import 'firebase/auth';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PostComponent } from './components/post/post.component';
import { PostingFormComponent } from './components/posting-form/posting-form.component';
import { LandingComponent } from './components/landing/landing.component';
import { ErrorComponent } from './components/error/error.component';
import { FooterComponent } from './components/footer/footer.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ViewComponent } from './components/view/view.component';
import { PostNoticeComponent } from './components/post-notice/post-notice.component';
import { NoticeComponent } from './components/notice/notice.component';
import { ApproveComponent } from './components/approve/approve.component';
import { StudentApplicationsComponent } from './components/student-applications/student-applications.component';
import { ApplicationCardComponent } from './components/application-card/application-card.component';

firebase.initializeApp({
  apiKey: "AIzaSyBB7HhosHv72jsyprcep6YQv24tKNAtJlA",
  authDomain: "internship-portal-aaa27.firebaseapp.com",
  databaseURL: "https://internship-portal-aaa27.firebaseio.com",
  projectId: "internship-portal-aaa27",
  storageBucket: "",
  messagingSenderId: "143446540545",
  appId: "1:143446540545:web:9a274720eba460db509b00"
});

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    SignUpComponent,
    ProfileComponent,
    PostComponent,
    PostingFormComponent,
    LandingComponent,
    ErrorComponent,
    FooterComponent,
    EditProfileComponent,
    ViewComponent,
    PostNoticeComponent,
    NoticeComponent,
    ApproveComponent,
    StudentApplicationsComponent,
    ApplicationCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
