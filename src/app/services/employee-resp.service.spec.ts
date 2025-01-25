import { TestBed } from '@angular/core/testing';

import { EmployeeRespService } from './employee-resp.service';

describe('EmployeeRespService', () => {
  let service: EmployeeRespService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeRespService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
