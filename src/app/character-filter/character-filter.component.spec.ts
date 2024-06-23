import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterFilterComponent } from './character-filter.component';

describe('CharacterFilterComponent', () => {
  let component: CharacterFilterComponent;
  let fixture: ComponentFixture<CharacterFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CharacterFilterComponent]
    });
    fixture = TestBed.createComponent(CharacterFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
