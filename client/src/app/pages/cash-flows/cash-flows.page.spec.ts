import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CashFlowsPage } from './cash-flows.page';

describe('CashFlowsPage', () => {
  let component: CashFlowsPage;
  let fixture: ComponentFixture<CashFlowsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CashFlowsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
