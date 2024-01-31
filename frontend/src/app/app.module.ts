// app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CountryCardComponent } from './country-card/country-card.component';
import { FavouriteService } from './favourite.service';

@NgModule({
  declarations: [
    AppComponent,
    CountryCardComponent, // Include CountryCardComponent in declarations array
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule, // If needed
  ],
  providers: [FavouriteService],
  bootstrap: [AppComponent],
})
export class AppModule {}
