import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  title = 'PokedataV3';
  pokemon1 = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png';
  pokemon4 = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/4.png';
  pokemon7 = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/7.png';
  pokemon25 = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/25.png';
  currentPokemon = this.pokemon25;
  color1 = '#83ba36';
  color4 = '#de5138';
  color7 = '#5a9ca4';
  color25 = '#ded020';
  currentColor = this.color25;


  imgSlider(anything : string): void{
    this.currentPokemon = anything;
  }

  changeCircleColor(color : string): void{
    this.currentColor = color;
  }
}
