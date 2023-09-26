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

    this.itemService.getCurrentItemDetail()
      .subscribe(itemRetrieved => {
          this.item = itemRetrieved;
      });
  }

  ngOnInit(): void {
      if("/item".match(this.router.url)){
        this.hideDetailWindow();
      }
    }

  hideDetailWindow(){
      this.itemService.hideDetailWindow();
      this.item = {} as ItemDetail;
      this.location.go("/item");
    }
}
