import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';

import { ItemDetail } from '../model/item/item';


@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private pokemonUrl = 'https://pokeapi.co/api/v2';  // URL to web api

  private displayDetail = new BehaviorSubject<boolean>(false);
  private itemDetailId = 0;

  constructor(private http: HttpClient) { }

  getItemDetail(id: number): Observable<ItemDetail> {
    return this.http.get<ItemDetail>(this.pokemonUrl+'/item/'+id)
  }

  getCurrentItemDetail(): Observable<ItemDetail>{
    return this.getItemDetail(this.itemDetailId);
  }

  //
  //Detail
  //
  //Display screen
  //
  isDisplayDetail():BehaviorSubject<boolean> {
    return this.displayDetail;
  }

  displayDetailWindow(id:number){
    this.itemDetailId = id;
    this.displayDetail.next(true);
  }

  hideDetailWindow(){
    this.displayDetail.next(false);
  }
}
