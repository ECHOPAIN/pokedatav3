import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  menuClass = "toggle";
  navigationClass = "navigation";

  constructor() { }

  ngOnInit(): void {
  }

  toggleMenu(){
    if(this.menuClass == "toggle"){
      this.menuClass = "toggle active";
      this.navigationClass = "navigation active";
    }else{
      this.menuClass = "toggle";
      this.navigationClass = "navigation";
    }
  }

}
