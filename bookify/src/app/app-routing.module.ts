import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminGenresComponent} from './admin/admin-genres/admin-genres.component';
import {AdminMainComponent} from './admin/admin-main/admin-main.component';


const routes: Routes = [
  { path: 'admin', component: AdminMainComponent },
  { path: 'admin/genres', component: AdminGenresComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
