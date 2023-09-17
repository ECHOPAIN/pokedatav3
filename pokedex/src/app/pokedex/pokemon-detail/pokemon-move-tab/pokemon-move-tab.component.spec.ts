import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonMoveTabComponent } from './pokemon-move-tab.component';

describe('PokemonMoveTabComponent', () => {
  let component: PokemonMoveTabComponent;
  let fixture: ComponentFixture<PokemonMoveTabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonMoveTabComponent]
    });
    fixture = TestBed.createComponent(PokemonMoveTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
