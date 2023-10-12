import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditEmpformComponent } from './add-edit-empform.component';

describe('AddEditEmpformComponent', () => {
  let component: AddEditEmpformComponent;
  let fixture: ComponentFixture<AddEditEmpformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditEmpformComponent]
    });
    fixture = TestBed.createComponent(AddEditEmpformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
