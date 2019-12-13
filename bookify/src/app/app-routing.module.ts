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
import { AdminBooksComponent } from './admin/admin-books/admin-books.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { HomeComponentComponent } from './home/home-component/home-component.component';
import { LoginComponent } from './login/login/login.component';
import { AdminGuard } from './guards/admin/admin.guard';
import { AdminStatisticsComponent } from './admin/admin-statistics/admin-statistics.component';


const routes: Routes = [
  { path: '', component: HomeComponentComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminMainComponent, canActivate: [AdminGuard] },
  { path: 'admin/genres', component: AdminGenresComponent },
  { path: 'admin/achievements', component: AdminAchievementsComponent },
  { path: 'admin/shops', component: AdminShopsComponent },
  { path: 'admin/items', component: AdminItemsComponent },
  { path: 'admin/authors', component: AdminAuthorsComponent },
  { path: 'admin/comments', component: AdminCommentsComponent },
  { path: 'admin/reviews', component: AdminReviewsComponent },
  { path: 'admin/books', component: AdminBooksComponent },
  { path: 'admin/users', component: AdminUsersComponent },
  { path: 'admin/statistics', component: AdminStatisticsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
