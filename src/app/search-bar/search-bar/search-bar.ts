import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { SearchApi } from '../../github-api/github-api';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.html',
  styleUrls: ['./search-bar.css'],
  standalone: true,
  imports: [CommonModule]
})
export class SearchBar implements OnInit{

  searchValue = '';
  private searchTerms = new Subject<string>();
  searchResults$!: Observable<any>;

  constructor(private searchApi: SearchApi){}

  ngOnInit(): void {
    this.searchResults$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => {
        const trimmed = term.trim();
        return trimmed ? this.searchApi.searchThroughGit(trimmed) : of({ items: [] });
      })
    );
  }

  searchText(e: Event){
    const input = e.target as HTMLInputElement;
    this.searchValue = input.value;
    this.searchTerms.next(this.searchValue);
  }
}
