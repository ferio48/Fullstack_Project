import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextPageAddEditUserComponent } from './next-page-add-edit-user.component';

describe('NextPageAddEditUserComponent', () => {
  let component: NextPageAddEditUserComponent;
  let fixture: ComponentFixture<NextPageAddEditUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NextPageAddEditUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NextPageAddEditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
