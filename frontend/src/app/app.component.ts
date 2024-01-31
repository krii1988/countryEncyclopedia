import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NgxSearchFilterModule } from 'ngx-search-filter';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { Country } from './graphql.service';
import { GraphqlService } from './graphql.service';
import { DataService } from './data.service';
import { FavouriteService } from './favourite.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    NgxSearchFilterModule,
    SearchBarComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy {
  title = 'frontend';
  filteredCountries: Country[] = [];
  favouriteCountries: Country[] = [];
  private favouriteSubscription: Subscription;

  constructor(
    private graphqlService: GraphqlService,
    private dataService: DataService,
    private favouriteService: FavouriteService
  ) {
    // Subscribe to changes in favouriteService
    this.favouriteSubscription = this.favouriteService
      .favouritesChanged()
      .subscribe((favourites) => {
        this.favouriteCountries = favourites;
      });
  }

  ngOnInit(): void {
    // Fetch all countries when the component initializes
    this.graphqlService.getAllCountries().subscribe({
      next: (countries) => {
        // Update filtered countries in the data service
        this.dataService.setFilteredCountries(countries);
      },
      error: (error) => {
        console.error('Error fetching countries:', error);
      },
    });

    // Fetch favorite countries
    this.favouriteCountries = this.favouriteService.getFavourites();
    
  }

  ngOnDestroy(): void {
    // Unsubscribe from favouriteService changes to prevent memory leaks
    if (this.favouriteSubscription) {
      this.favouriteSubscription.unsubscribe();
    }
  }

  onSearchClear(): void {
    // When the search is cleared, fetch all countries again
    this.graphqlService.getAllCountries().subscribe({
      next: (countries) => {
        // Update filtered countries in the data service
        this.dataService.setFilteredCountries(countries);
      },
      error: (error) => {
        console.error('Error fetching countries:', error);
      },
    });
  }
}
