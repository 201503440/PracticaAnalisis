import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitarDineroComponent } from './debitar-dinero.component';

describe('DebitarDineroComponent', () => {
  let component: DebitarDineroComponent;
  let fixture: ComponentFixture<DebitarDineroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebitarDineroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebitarDineroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
