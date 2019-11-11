import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGenresComponent } from './admin/admin-genres/admin-genres.component';
import { AdminMainComponent } from './admin/admin-main/admin-main.component';
import { AdminAchievementsComponent } from './admin/admin-achievements/admin-achievements.component';


const routes: Routes = [
  { path: 'admin', component: AdminMainComponent },
  { path: 'admin/genres', component: AdminGenresComponent },
  { path: 'admin/achievements', component: AdminAchievementsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
