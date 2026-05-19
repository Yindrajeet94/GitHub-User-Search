import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, timer } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SearchApi {
  Api = "https://api.github.com/search/users?q="
  private readonly maxRetries = 2;

  constructor(private http: HttpClient) {}

  searchThroughGit(searchText: string) {
    const url = this.Api + encodeURIComponent(searchText);
    return this.http.get<any>(url).pipe(
      retry({
        count: this.maxRetries,
        delay: (error: HttpErrorResponse, retryCount: number) => {
          const isRetryable = error.status === 0 || error.status >= 500;

          if (!isRetryable) {
            return throwError(() => error);
          }

          return timer(1000 * retryCount);
        },
      }),
      catchError((error: HttpErrorResponse) => {
        const message = error.status === 0
          ? 'GitHub API request failed due to a network error.'
          : `GitHub API request failed (${error.status}): ${error.statusText || 'Unknown error'}`;

        return throwError(() => new Error(message));
      })
    );
  }
}
