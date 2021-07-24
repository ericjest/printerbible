import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from 'src/modules/common/footer/footer.component';
import { NavbarComponent } from 'src/modules/common/navbar/navbar.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from '../modules/common/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { BookAbbreviationPipe } from 'src/modules/common/home/book-abbreviation.pipe';

const appRoutes: Routes = [
  { path: '', component: HomeComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    BookAbbreviationPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [BookAbbreviationPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
