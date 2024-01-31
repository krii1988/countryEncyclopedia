import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { GraphqlService } from './../graphql.service';
import { CountryTableRowComponent } from './../country-table-row/country-table-row.component';
import { Country } from './../graphql.service';
import { FavouriteService } from './../favourite.service';

@Component({
  selector: 'app-country-detail',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, CountryTableRowComponent],
  templateUrl: './country-detail.component.html',
  styleUrl: './country-detail.component.css',
})
export class CountryDetailComponent implements OnInit {
  country_code!: string;
  country: any = {}; // Initialize country object as mutable

  constructor(
    private route: ActivatedRoute,
    private graphqlService: GraphqlService,
    private favouriteService: FavouriteService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.country_code = params['country_code'];
      this.loadCountryDetails();
    });
  }

  loadCountryDetails() {
    this.graphqlService
      .getCountryByCode(this.country_code)
      .subscribe((country) => {
        this.country = { ...country }; // Make a shallow copy to ensure mutability
        this.country.languages = JSON.parse(country?.languages || '[]');
        this.country.borders = JSON.parse(country?.borders || '[]');

        this.loadBorderingCountries(this.country.borders);
      });
  }

  loadBorderingCountries(borders: string[]) {
    this.country.borders = [];
    for (const border of borders) {
      this.graphqlService
        .getCountryByCode(border.toLowerCase())
        .subscribe((country) => {
          this.country.borders.push(country as Country);
        });
    }
  }

  toggleFavourite(country: Country): void {
    this.favouriteService.toggleFavourite(country);
  }

  isFavourite(country: Country): boolean {
    return this.favouriteService.isFavourite(country);
  }
}
