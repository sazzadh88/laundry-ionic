import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WomentabPage } from './womentab.page';

describe('WomentabPage', () => {
  let component: WomentabPage;
  let fixture: ComponentFixture<WomentabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WomentabPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WomentabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
