import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchBar } from './search-bar/search-bar/search-bar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SearchBar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Smart-Search-Dashboard');
}
