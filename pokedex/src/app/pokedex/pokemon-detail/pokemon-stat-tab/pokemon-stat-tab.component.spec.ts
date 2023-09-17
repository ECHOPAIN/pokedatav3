import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonStatTabComponent } from './pokemon-stat-tab.component';

describe('PokemonStatTabComponent', () => {
  let component: PokemonStatTabComponent;
  let fixture: ComponentFixture<PokemonStatTabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonStatTabComponent]
    });
    fixture = TestBed.createComponent(PokemonStatTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
