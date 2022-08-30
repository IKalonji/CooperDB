import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDatabasesComponent } from './manage-databases.component';

describe('ManageDatabasesComponent', () => {
  let component: ManageDatabasesComponent;
  let fixture: ComponentFixture<ManageDatabasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageDatabasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDatabasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
