import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminSidebarComponent } from './admin/admin-sidebar/admin-sidebar.component';
import { AdminGenresComponent } from './admin/admin-genres/admin-genres.component';
import { AdminMainComponent } from './admin/admin-main/admin-main.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminSidebarComponent,
    AdminGenresComponent,
    AdminMainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
