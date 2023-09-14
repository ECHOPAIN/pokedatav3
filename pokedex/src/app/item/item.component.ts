import { Component } from '@angular/core';

import { Items } from '../model/item/itemsResult';
import { PokedexService } from '../services/pokedex.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {
  items: Items[] = [];
  filteredItemList: Items[] = [];
  isLoading: Boolean = false;
  batchSize: number = 50;

  constructor(private pokedexService: PokedexService) { }

  ngOnInit(): void {
    this.loadItemList()
  }

  loadItemList(): void {
    this.isLoading = true;
    this.pokedexService.getAllItems()
      .subscribe(itemsRetrieved => {
          this.items = itemsRetrieved.results;
          this.filteredItemList = this.items.slice(0, this.batchSize);
          this.isLoading = false;
      });
  }

  //When user is typing in the search bar
  onKey(event: any) {
    this.filterItem(event.target.value);
  }

  filterItem(search: String){

  }

  onScroll(){
    //TODO
  }
}
