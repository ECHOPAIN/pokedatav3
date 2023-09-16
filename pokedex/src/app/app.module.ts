import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokedexComponent } from './pokedex/pokedex.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PokemonGridItemComponent } from './pokedex/pokemon-grid-item/pokemon-grid-item.component';
import { PokemonListItemComponent } from './pokedex/pokemon-list-item/pokemon-list-item.component';
import { ItemComponent } from './item/item.component';
import { ItemGridItemComponent } from './item/item-grid-item/item-grid-item.component';
import { HomeComponent } from './home/home.component';
import { PokemonDetailComponent } from './pokedex/pokemon-detail/pokemon-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    PokedexComponent,
    NavbarComponent,
    PokemonGridItemComponent,
    PokemonListItemComponent,
    ItemComponent,
    ItemGridItemComponent,
    HomeComponent,
    PokemonDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ScrollingModule,
    InfiniteScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
