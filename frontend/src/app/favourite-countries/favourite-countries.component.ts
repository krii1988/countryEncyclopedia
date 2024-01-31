import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Country } from '../graphql.service';
import { FavouriteService } from '../favourite.service';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CountryCardComponent } from '../country-card/country-card.component';

@Component({
  selector: 'app-favourite-countries',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, CountryCardComponent],
  templateUrl: './favourite-countries.component.html',
  styleUrl: './favourite-countries.component.css',
})
export class FavouriteCountriesComponent {
  favouriteCountries: Country[] = [];

  constructor(private favouriteService: FavouriteService) {}

  ngOnInit(): void {
    this.favouriteCountries = this.favouriteService.getFavourites();

      this.favouriteCountries.sort(
        (a, b) => Number(a.population_rank) - Number(b.population_rank)
      );
  }

  toggleFavourite(country: Country): void {
    this.favouriteService.toggleFavourite(country);
  }

  isFavourite(country: Country): boolean {
    return this.favouriteService.isFavourite(country);
  }
}
