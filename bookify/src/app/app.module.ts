import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminSidebarComponent } from './admin/admin-sidebar/admin-sidebar.component';
import { AdminGenresComponent } from './admin/admin-genres/admin-genres.component';
import { AdminMainComponent } from './admin/admin-main/admin-main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import {
  MatAutocompleteModule, MatListModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule,
  MatTableModule, MatCardModule, MatRadioModule, MatIconModule
} from '@angular/material';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AdminAchievementsComponent } from './admin/admin-achievements/admin-achievements.component';
import { AdminShopsComponent } from './admin/admin-shops/admin-shops.component';
import { AdminItemsComponent } from './admin/admin-items/admin-items.component';
import { AdminAuthorsComponent } from './admin/admin-authors/admin-authors.component';
import { AdminCommentsComponent } from './admin/admin-comments/admin-comments.component';
import { AdminReviewsComponent } from './admin/admin-reviews/admin-reviews.component';
import { AdminBooksComponent } from './admin/admin-books/admin-books.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminSidebarComponent,
    AdminGenresComponent,
    AdminMainComponent,
    AdminAchievementsComponent,
    AdminShopsComponent,
    AdminItemsComponent,
    AdminAuthorsComponent,
    AdminCommentsComponent,
    AdminReviewsComponent,
    AdminBooksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatTableModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,

    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatTableModule,
    MatCardModule,
    MatRadioModule,
    MatIconModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
