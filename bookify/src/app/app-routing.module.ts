import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGenresComponent } from './admin/admin-genres/admin-genres.component';
import { AdminMainComponent } from './admin/admin-main/admin-main.component';
import { AdminAchievementsComponent } from './admin/admin-achievements/admin-achievements.component';
import { AdminShopsComponent } from './admin/admin-shops/admin-shops.component';
import { AdminItemsComponent } from './admin/admin-items/admin-items.component';
import { AdminAuthorsComponent } from './admin/admin-authors/admin-authors.component';


const routes: Routes = [
  { path: 'admin', component: AdminMainComponent },
  { path: 'admin/genres', component: AdminGenresComponent },
  { path: 'admin/achievements', component: AdminAchievementsComponent },
  { path: 'admin/shops', component: AdminShopsComponent },
  { path: 'admin/items', component: AdminItemsComponent },
  { path: 'admin/authors', component: AdminAuthorsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
