import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokedexComponent } from './pokedex/pokedex.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PokemonGridItemComponent } from './pokedex/pokemon-grid-item/pokemon-grid-item.component';

@NgModule({
  declarations: [
    AppComponent,
    PokedexComponent,
    NavbarComponent,
    PokemonGridItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
