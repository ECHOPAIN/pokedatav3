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
  maxItemId: number = 954;
  search: String = "";

  constructor(private pokedexService: PokedexService) { }

  ngOnInit(): void {
    this.loadItemList()
  }

  loadItemList(): void {
    this.isLoading = true;
    this.pokedexService.getAllItems()
      .subscribe(itemsRetrieved => {
          this.items = itemsRetrieved.results.slice(0, this.maxItemId);
          this.filteredItemList = this.items.slice(0, this.batchSize);
          this.isLoading = false;
      });
  }

  //When user is typing in the search bar
  onKey(event: any) {
    this.filterItem(event.target.value);
  }

  filterItem(search: String){
    this.search = search;
      if (!search) {
          this.filteredItemList = this.items;
        }

        this.filteredItemList = this.items.filter(
          item => item?.name.toLowerCase().includes(search.toLowerCase())||item?.url.split('/')[6].toLowerCase().includes(search.toLowerCase())
        ).slice(0,this.batchSize);
    }

    onScroll(){
      //we are searching for a item
      if (this.search) {
        var allFilteredItems: Items[] = []
        allFilteredItems = this.items.filter(
                item => item?.name.toLowerCase().includes(this.search.toLowerCase())||item?.url.split('/')[6].toLowerCase().includes(this.search.toLowerCase())
              );
        //done
        if(this.filteredItemList.length >= allFilteredItems.length){
          return;
        }
        //if we reach the end of the list
        if (this.filteredItemList.length+this.batchSize > allFilteredItems.length) {
          this.filteredItemList.push(...allFilteredItems.slice(this.filteredItemList.length,allFilteredItems.length));
        } else {
          this.filteredItemList.push(...allFilteredItems.slice(this.filteredItemList.length,this.filteredItemList.length+this.batchSize));
        }
      }else{
            //we are not searching for a item
            //done
            if(this.filteredItemList.length >= this.maxItemId){
              return;
            }
            //if we reach the end of the list
            if (this.filteredItemList.length+this.batchSize > this.maxItemId) {
              this.filteredItemList.push(...this.items.slice(this.filteredItemList.length,this.maxItemId));
            } else {
                this.filteredItemList.push(...this.items.slice(this.filteredItemList.length,this.filteredItemList.length+this.batchSize));
            }
          }
        }
}
