import { TestBed } from '@angular/core/testing';

import { ImageOperationsService } from './image-operations.service';

describe('ImageOperationsService', () => {
  let service: ImageOperationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageOperationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
