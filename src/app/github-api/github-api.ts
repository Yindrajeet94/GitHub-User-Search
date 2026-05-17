import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SearchApi {
  Api = "https://api.github.com/search/users?q="

  constructor(private http: HttpClient) {}

  searchThroughGit(searchText: string) {
    const url = this.Api + encodeURIComponent(searchText);
    return this.http.get<any>(url);
  }
}
