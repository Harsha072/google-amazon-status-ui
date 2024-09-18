import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StatusServiceService } from './status-service.service';

describe('StatusServiceService', () => {
  let service: StatusServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StatusServiceService]
    });
    service = TestBed.inject(StatusServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
