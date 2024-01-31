// src/app/countries.component.ts

import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { GraphqlService } from './../graphql.service';
import { initFlowbite } from 'flowbite';
import { NgxSearchFilterModule } from 'ngx-search-filter';
import { Country } from './../graphql.service';
import { DataService } from './../data.service';
import { SearchBarComponent } from './../search-bar/search-bar.component';
import { FavouriteService } from './../favourite.service';
import { CountryCardComponent } from '../country-card/country-card.component';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    NgxSearchFilterModule,
    SearchBarComponent,
    CountryCardComponent,
  ],
  templateUrl: './countries.component.html',
})
export class CountryComponent implements OnInit {
  title = 'countries';
  countries!: any[];
  translations!: any[];
  borders!: any[];
  languages!: any[];
  filteredCountries: Country[] = [];
  searchQuery: string = '';
  length!: number;
  constructor(
    private graphqlService: GraphqlService,
    private dataService: DataService,
    private favouriteService: FavouriteService
  ) {}

  ngOnInit(): void {
    initFlowbite();
    // Fetch all countries when the component initializes
    this.onSearchClear();

    this.graphqlService.getAllCountries().subscribe((countries) => {
      this.countries = countries.map((country: any) => ({
        ...country,
        translations: JSON.parse(country.translations),
        borders: JSON.parse(country.borders),
        languages: JSON.parse(country.languages),
      }));
      
      this.countries.sort(
        (a, b) => Number(a.population_rank) - Number(b.population_rank)
      );
      this.length = this.countries.length;
    });

    // Subscribe to changes in the filtered countries
    this.dataService.filteredCountries$.subscribe((filteredCountries) => {
      this.filteredCountries = [...filteredCountries];
      this.filteredCountries.sort((a, b) => Number(a.population_rank) - Number(b.population_rank));
    });
  }

  onSearchChange(query: string): void {
    this.searchQuery = query.trim();
    if (this.searchQuery !== '') {
      this.fetchFilteredCountries();
    } else {
      this.filteredCountries = this.countries;
    }
  }

  private fetchFilteredCountries(): void {
    this.graphqlService.getAllCountries(this.searchQuery).subscribe({
      next: (countries) => {
        this.dataService.setFilteredCountries(countries);
      },
      error: (error) => {
        console.error('Error fetching countries:', error);
        // Handle error, e.g., show error message to the user
      },
    });
  }

  toggleFavourite(country: Country): void {
    this.favouriteService.toggleFavourite(country);
  }

  isFavourite(country: Country): boolean {
    return this.favouriteService.isFavourite(country);
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
