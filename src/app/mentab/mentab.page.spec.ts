import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MentabPage } from './mentab.page';

describe('MentabPage', () => {
  let component: MentabPage;
  let fixture: ComponentFixture<MentabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MentabPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MentabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
