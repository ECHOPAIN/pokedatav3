import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

import WaveSurfer from 'wavesurfer.js';


import { PokemonDetail } from '../../../../model/pokeapi/pokeApiDetail';

@Component({
  selector: 'app-pokemon-cry',
  templateUrl: './pokemon-cry.component.html',
  styleUrls: ['./pokemon-cry.component.scss']
})
export class PokemonCryComponent implements AfterViewInit{
 @Input() pokemon: PokemonDetail;
 @ViewChild('wave') container!: ElementRef;

 waveSurfer!: WaveSurfer;
 playerReady: boolean= false;

  ngAfterViewInit(): void{
    this.waveSurfer = WaveSurfer.create({
        container: this.container.nativeElement,
        waveColor: '#535353',
        progressColor: '#1F1F1F',
        barWidth: 3,
        barGap: 2,
        barRadius: 30,
        height: 40,
        url: this.getPokemonCry()
    });
    this.waveSurfer.on('ready',()=>{
      this.playerReady = true;
    });
  }
  constructor() {
      this.pokemon = {} as PokemonDetail;
  }

  getPokemonCry(){
    return this.pokemon.cries.latest;
  }

  togglePlay(){
    if(this.waveSurfer.isPlaying()){
      this.waveSurfer.pause();
    }else{
      this.waveSurfer.play();
    }
  }
}
