import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { StatusComponent } from './status.component';
import { StatusServiceService } from 'src/app/service/status-service.service';

describe('StatusComponent', () => {
  let component: StatusComponent;
  let fixture: ComponentFixture<StatusComponent>;
  let statusService: jasmine.SpyObj<StatusServiceService>;

  beforeEach(async () => {
    const statusServiceSpy = jasmine.createSpyObj('StatusServiceService', ['getGoogleStatus', 'getAmazonStatus', 'getAllStatus']);

    await TestBed.configureTestingModule({
      declarations: [ StatusComponent ],
      providers: [
        { provide: StatusServiceService, useValue: statusServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusComponent);
    component = fixture.componentInstance;
    statusService = TestBed.inject(StatusServiceService) as jasmine.SpyObj<StatusServiceService>;


    statusService.getGoogleStatus.and.returnValue(of({}));
    statusService.getAmazonStatus.and.returnValue(of({}));
    statusService.getAllStatus.and.returnValue(of({}));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call fetchStatus on init', () => {
    spyOn(component, 'fetchStatus').and.callThrough();
    component.ngOnInit();
    expect(component.fetchStatus).toHaveBeenCalled();
  });

  it('should fetch statuses on fetchStatus call', () => {
    const googleStatusMock = { status: 'ok' };
    const amazonStatusMock = { status: 'ok' };
    const allStatusMock = { status: 'ok' };

    statusService.getGoogleStatus.and.returnValue(of(googleStatusMock));
    statusService.getAmazonStatus.and.returnValue(of(amazonStatusMock));
    statusService.getAllStatus.and.returnValue(of(allStatusMock));

    component.fetchStatus();

    expect(component.googleStatus).toEqual(googleStatusMock);
    expect(component.amazonStatus).toEqual(amazonStatusMock);
    expect(component.allStatus).toEqual(allStatusMock);
  });

  it('should handle errors on fetchStatus call', () => {
    const errorMock = new Error('Error fetching status');

    statusService.getGoogleStatus.and.returnValue(throwError(() => errorMock));
    statusService.getAmazonStatus.and.returnValue(throwError(() => errorMock));
    statusService.getAllStatus.and.returnValue(throwError(() => errorMock));

    spyOn(console, 'error');

    component.fetchStatus();

    expect(console.error).toHaveBeenCalledWith('Error fetching Google status:', errorMock);
    expect(console.error).toHaveBeenCalledWith('Error fetching Amazon status:', errorMock);
    expect(console.error).toHaveBeenCalledWith('Error fetching Amazon status:', errorMock);
  });

  it('should unsubscribe on destroy', () => {
    spyOn(component.subscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.subscription.unsubscribe).toHaveBeenCalled();
  });
});