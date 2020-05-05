import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolCreditoComponent } from './sol-credito.component';

describe('SolCreditoComponent', () => {
  let component: SolCreditoComponent;
  let fixture: ComponentFixture<SolCreditoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolCreditoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolCreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
