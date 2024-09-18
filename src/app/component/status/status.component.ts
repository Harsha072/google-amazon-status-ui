import { Component } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { StatusServiceService } from 'src/app/service/status-service.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent {
  googleStatus: any = null;
  amazonStatus: any = null;
  allStatus: any = null;
  public subscription: Subscription = new Subscription();

  constructor(private statusService: StatusServiceService) {}

  ngOnInit(): void {
    this.fetchStatus();
    this.subscription.add(
      interval(60000).subscribe(() => this.fetchStatus())
    );
  }

  fetchStatus(): void {
    console.log('Fetching status...');
    this.statusService.getGoogleStatus().subscribe(
      data => this.googleStatus = data,
      error => console.error('Error fetching Google status:', error)
    );
    this.statusService.getAmazonStatus().subscribe(
      data => this.amazonStatus = data,
      error => console.error('Error fetching Amazon status:', error)
    );
    this.statusService.getAllStatus().subscribe(
      data => this.allStatus = data,
      error => console.error('Error fetching Amazon status:', error)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
