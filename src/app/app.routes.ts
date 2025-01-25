import { Routes } from '@angular/router';
import { AddEditUserComponent } from './pages/add-edit-user/add-edit-user.component';
import { NextPageAddEditUserComponent } from './pages/next-page-add-edit-user/next-page-add-edit-user.component';
import { HomeComponent } from './pages/home/home.component';
import { BugReportComponent } from './pages/bug-report/bug-report.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { AddImageComponent } from './pages/add-image/add-image.component';
import { ChatHomeComponent } from './pages/chat-home/chat-home.component';


export const routes: Routes = [
    { 
        path: '', loadComponent: () => import('./pages/login/login.component').then(a => a.LoginComponent)
    },
    { 
        path: 'users', component: AddEditUserComponent 
    },
    { 
        path: 'employeeTable', component: NextPageAddEditUserComponent 
    },
    { 
        path: 'home', component: HomeComponent 
    },
    {
        path: 'bugReport', component: BugReportComponent
    },
    {
        path: 'profile', component: ProfileComponent
    },
    {
        path: 'gallery', component: GalleryComponent
    },
    {
        path: 'addImage', component: AddImageComponent
    },
    {
        path: 'chatHome', component: ChatHomeComponent
    }
];
