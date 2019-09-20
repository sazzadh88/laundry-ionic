import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KidstabPage } from './kidstab.page';

describe('KidstabPage', () => {
  let component: KidstabPage;
  let fixture: ComponentFixture<KidstabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KidstabPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KidstabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
