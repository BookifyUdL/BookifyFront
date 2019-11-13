import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGenresComponent } from './admin/admin-genres/admin-genres.component';
import { AdminMainComponent } from './admin/admin-main/admin-main.component';
import { AdminAchievementsComponent } from './admin/admin-achievements/admin-achievements.component';
import { AdminShopsComponent } from './admin/admin-shops/admin-shops.component';
import { AdminItemsComponent } from './admin/admin-items/admin-items.component';
import { AdminAuthorsComponent } from './admin/admin-authors/admin-authors.component';
import { AdminCommentsComponent } from './admin/admin-comments/admin-comments.component';
import { AdminReviewsComponent } from './admin/admin-reviews/admin-reviews.component';


const routes: Routes = [
  { path: 'admin', component: AdminMainComponent },
  { path: 'admin/genres', component: AdminGenresComponent },
  { path: 'admin/achievements', component: AdminAchievementsComponent },
  { path: 'admin/shops', component: AdminShopsComponent },
  { path: 'admin/items', component: AdminItemsComponent },
  { path: 'admin/authors', component: AdminAuthorsComponent },
  { path: 'admin/comments', component: AdminCommentsComponent },
  { path: 'admin/reviews', component: AdminReviewsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
