import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateTableComponent } from './create-update-table.component';

describe('CreateUpdateTableComponent', () => {
  let component: CreateUpdateTableComponent;
  let fixture: ComponentFixture<CreateUpdateTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
