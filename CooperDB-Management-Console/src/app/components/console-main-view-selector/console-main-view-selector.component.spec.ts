import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsoleMainViewSelectorComponent } from './console-main-view-selector.component';

describe('ConsoleMainViewSelectorComponent', () => {
  let component: ConsoleMainViewSelectorComponent;
  let fixture: ComponentFixture<ConsoleMainViewSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsoleMainViewSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsoleMainViewSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
