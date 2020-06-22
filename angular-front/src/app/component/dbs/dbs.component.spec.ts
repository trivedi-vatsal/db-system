import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbsComponent } from './dbs.component';

describe('DbsComponent', () => {
  let component: DbsComponent;
  let fixture: ComponentFixture<DbsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
