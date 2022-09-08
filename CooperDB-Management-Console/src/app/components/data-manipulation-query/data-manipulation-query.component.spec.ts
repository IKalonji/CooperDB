import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataManipulationQueryComponent } from './data-manipulation-query.component';

describe('DataManipulationQueryComponent', () => {
  let component: DataManipulationQueryComponent;
  let fixture: ComponentFixture<DataManipulationQueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataManipulationQueryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataManipulationQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
