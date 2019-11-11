import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptaItemComponent } from './crypta-item.component';

describe('CryptaItemComponent', () => {
  let component: CryptaItemComponent;
  let fixture: ComponentFixture<CryptaItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CryptaItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptaItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
