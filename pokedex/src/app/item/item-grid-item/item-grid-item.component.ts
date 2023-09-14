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
}
