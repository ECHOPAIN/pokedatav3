import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonEvolutionTabComponent } from './pokemon-evolution-tab.component';

describe('PokemonEvolutionTabComponent', () => {
  let component: PokemonEvolutionTabComponent;
  let fixture: ComponentFixture<PokemonEvolutionTabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonEvolutionTabComponent]
    });
    fixture = TestBed.createComponent(PokemonEvolutionTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
