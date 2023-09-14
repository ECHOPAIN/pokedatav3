import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemGridItemComponent } from './item-grid-item.component';

describe('ItemGridItemComponent', () => {
  let component: ItemGridItemComponent;
  let fixture: ComponentFixture<ItemGridItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemGridItemComponent]
    });
    fixture = TestBed.createComponent(ItemGridItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
