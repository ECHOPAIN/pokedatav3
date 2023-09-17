import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonAboutTabComponent } from './pokemon-about-tab.component';

describe('PokemonAboutTabComponent', () => {
  let component: PokemonAboutTabComponent;
  let fixture: ComponentFixture<PokemonAboutTabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonAboutTabComponent]
    });
    fixture = TestBed.createComponent(PokemonAboutTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
