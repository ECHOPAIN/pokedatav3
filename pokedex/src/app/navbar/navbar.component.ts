import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';


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

  constructor(private route: ActivatedRoute, private location: Location, private router: Router, private translationService: TranslationService) { }

  ngOnInit(): void {
    //this.countryCode = this.translationService.getLanguageCode()
    this.route.queryParams.subscribe(params => {
        let param = params['langue'];
        this.countryCode = param ? param : 'en'
        if(param){
          this.setLanguage(this.countryCode)
        }
    });

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

  setLanguageAndNavigate(language: string): void{
    this.setLanguage(language)
    this.router.url
    this.location.go(this.router.url.split('?')[0] +"?langue="+this.translationService.getLanguageCode());

  }
  setLanguage(language: string): void{
    this.toggleMenu()
    this.translationService.setLanguageByCode(language);
    this.countryCode = this.translationService.getLanguageCode()
  }

  redirect(route:string){
    this.router.navigate(['./'+route],{queryParams: { langue: this.translationService.getLanguageCode()}});
  }

}
