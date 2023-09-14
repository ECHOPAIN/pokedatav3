import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { PokedexComponent } from './pokedex/pokedex.component';
import { ItemComponent } from './item/item.component';

const routes: Routes = [
  { path: '', redirectTo: 'pokedex', pathMatch: 'full' },
  { path: 'pokedex', component: PokedexComponent },
  { path: 'item', component: ItemComponent },
  { path: '**', redirectTo: 'pokedex' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
