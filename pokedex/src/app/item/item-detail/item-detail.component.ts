import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { Router } from '@angular/router';

import { ItemService } from '../../services/item.service';
import { ItemDetail } from '../../model/item/item';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent {
  item: ItemDetail;

  constructor(private itemService: ItemService, private location: Location, private router: Router) {
    this.item = {} as ItemDetail;
  }

  ngOnInit(): void {

      this.itemService.getCurrentItemDetail()
        .subscribe(itemRetrieved => {
            this.item = itemRetrieved;
        });
    }

  getPokemonFlavorText(){
    var flavorTextToReturn = "";
    this.item.flavor_text_entries.forEach((flavorTextEntries) =>{
                                                    if(flavorTextEntries.language.name == "en" &&
                                                    (flavorTextEntries.text[0] != "-" && flavorTextEntries.text[2] != "-" && flavorTextEntries.text[4] != "-") //!= "- - -"
                                                    ){
                                                      //console.log("ok for text :"+flavorTextEntries.text)
                                                      flavorTextToReturn = flavorTextEntries.text
                                                    }})
    return flavorTextToReturn;
  }

  hideDetailWindow(){
      this.itemService.hideDetailWindow();
      this.item = {} as ItemDetail;
      this.location.go("/item");
    }
}
