import { Component, OnInit } from '@angular/core';

import { TranslationService } from '../services/translation.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  menuClass = "toggle";
  navigationClass = "navigation";

  countryCode = "";

  constructor(private translationService: TranslationService) { }

  ngOnInit(): void {
    this.countryCode = this.translationService.getLanguageCode()
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

  setLanguage(language: string): void{
    this.toggleMenu()
    this.translationService.setLanguageByCode(language);
    this.countryCode = this.translationService.getLanguageCode()
  }

}
