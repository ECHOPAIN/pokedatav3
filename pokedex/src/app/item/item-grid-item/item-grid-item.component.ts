import { Component, OnInit, Input } from '@angular/core';

import { Items } from '../../model/item/itemsResult';

@Component({
  selector: 'app-item-grid-item',
  templateUrl: './item-grid-item.component.html',
  styleUrls: ['./item-grid-item.component.scss']
})
export class ItemGridItemComponent {
  @Input() item: Items;

  constructor() {
      this.item =
              { name: "MissingNo.",
                url: "https://pokeapi.co/api/v2/pokemon/0/"
              }
    }

    getImage(){
    if(/tm[0-9]+/.test(this.item.name)){
      return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-normal.png"
    }
      return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/"+this.item.name+".png"
    }

    display(){

    }
}
