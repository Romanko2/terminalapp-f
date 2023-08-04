import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TickersChartComponent } from './tickers-chart.component';

describe('TickersChartComponent', () => {
  let component: TickersChartComponent;
  let fixture: ComponentFixture<TickersChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TickersChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TickersChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
