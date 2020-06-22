import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TbsComponent } from './tbs.component';

describe('TbsComponent', () => {
  let component: TbsComponent;
  let fixture: ComponentFixture<TbsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TbsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
