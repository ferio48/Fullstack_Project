import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBugEditComponent } from './add-bug-edit.component';

describe('AddBugEditComponent', () => {
  let component: AddBugEditComponent;
  let fixture: ComponentFixture<AddBugEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBugEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddBugEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
