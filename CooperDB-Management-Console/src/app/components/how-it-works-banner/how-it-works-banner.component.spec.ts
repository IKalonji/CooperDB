import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowItWorksBannerComponent } from './how-it-works-banner.component';

describe('HowItWorksBannerComponent', () => {
  let component: HowItWorksBannerComponent;
  let fixture: ComponentFixture<HowItWorksBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HowItWorksBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HowItWorksBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
