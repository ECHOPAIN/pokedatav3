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
import { PokemonEvolutionTabComponent } from './pokedex/pokemon-detail/pokemon-evolution-tab/pokemon-evolution-tab.component';
import { PokemonMoveTabComponent } from './pokedex/pokemon-detail/pokemon-move-tab/pokemon-move-tab.component';
import { PokemonAboutTabComponent } from './pokedex/pokemon-detail/pokemon-about-tab/pokemon-about-tab.component';
import { PokemonStatTabComponent } from './pokedex/pokemon-detail/pokemon-stat-tab/pokemon-stat-tab.component';
import { ItemDetailComponent } from './item/item-detail/item-detail.component';
import { PokemonCryComponent } from './pokedex/pokemon-detail/pokemon-about-tab/pokemon-cry/pokemon-cry.component';

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
    PokemonDetailComponent,
    PokemonEvolutionTabComponent,
    PokemonMoveTabComponent,
    PokemonAboutTabComponent,
    PokemonStatTabComponent,
    ItemDetailComponent,
    PokemonCryComponent
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
