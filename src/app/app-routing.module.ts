import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LandingComponent } from './components/landing/landing.component';
import { ErrorComponent } from './components/error/error.component';
import { AuthGuard } from './Guards/auth.guard';
import { PostingFormComponent } from './components/posting-form/posting-form.component';
import { PostComponent } from './components/post/post.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ViewComponent } from './components/view/view.component';
import { NoticeComponent } from './components/notice/notice.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ApproveComponent } from './components/approve/approve.component';
import { StudentApplicationsComponent } from './components/student-applications/student-applications.component';
const routes: Routes = [
  
  { path: 'landing',component:LandingComponent },
  { path: 'home' , component:HomeComponent , canActivate: [AuthGuard] },
  { path: 'post', component:PostComponent },
  { path: 'profile/:id', component:ProfileComponent },
  { path: 'Login', component:LoginComponent },
  // { path: 'appliedStudent', component:AppliedStudentComponent },
  // { path: 'appliedFaculty', component:AppliedFacultyComponent },
  { path: 'applications',component: StudentApplicationsComponent},
  { path: 'approve', component:ApproveComponent },
  { path: 'view/:internshipId', component:ViewComponent},
  { path: 'edit-profile/:id', component:EditProfileComponent },
  { path: 'signUp' , component:SignUpComponent },
  { path: 'PageNotFound',component: ErrorComponent},
  { path: 'notices',component: NoticeComponent},
  
  { path:'**' , redirectTo: 'landing'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
