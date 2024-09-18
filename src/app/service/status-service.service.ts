import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class StatusServiceService {

  private googleUrl = `${environment.apiUrl}/v1/google-status`;
  private amazonUrl = `${environment.apiUrl}/v1/amazon-status`;
  private allUrl = `${environment.apiUrl}/v1/all-status`;

  constructor(private http: HttpClient) {}

  getGoogleStatus(): Observable<any> {
    return this.http.get<any>(this.googleUrl).pipe(
      catchError(error => {
        console.error('Error fetching Google status:', error);
        return throwError(error);
      })
    );
  }

  getAmazonStatus(): Observable<any> {
    return this.http.get<any>(this.amazonUrl).pipe(
      catchError(error => {
        console.error('Error fetching Amazon status:', error);
        return throwError(error);
      })
    );
  }
  getAllStatus(): Observable<any> {
    return this.http.get<any>(this.allUrl).pipe(
      catchError(error => {
        console.error('Error fetching both status:', error);
        return throwError(error);
      })
    );
  }
}
