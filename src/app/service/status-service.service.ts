import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusServiceService {

  private googleUrl = 'http://localhost:3000/v1/google-status';
  private amazonUrl = 'http://localhost:3000/v1/amazon-status';
  private allUrl = 'http://localhost:3000/v1/all-status';

  constructor(private http: HttpClient) {}

  getGoogleStatus(): Observable<any> {
    return this.http.get<any>(this.googleUrl);
  }

  getAmazonStatus(): Observable<any> {
    return this.http.get<any>(this.amazonUrl);
  }
  getAllStatus(): Observable<any> {
    return this.http.get<any>(this.allUrl);
  }
}
