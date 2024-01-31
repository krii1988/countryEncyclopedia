import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { GraphqlService } from './../graphql.service';
import { CommonModule } from '@angular/common';
import { Country } from '../graphql.service';
import { CountryData } from './../graphql.service';
import { FavouriteService } from '../favourite.service';
import { CountryCardComponent } from '../country-card/country-card.component';

@Component({
  selector: 'app-by-language',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, CountryCardComponent],
  templateUrl: './by-language.component.html',
  styleUrl: './by-language.component.css',
})
export class ByLanguageComponent {
  countryData: CountryData = { countries: [], uniqueLanguages: [] };
  currentLanguage!: string;
  language!: string;

  constructor(
    private route: ActivatedRoute,
    private graphqlService: GraphqlService,
    private favouriteService: FavouriteService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const language = params['language'];
      this.language = language;
      this.graphqlService.getCountriesByLanguage(language).subscribe((data) => {
       this.countryData = data;

       // Create a copy of the countries array
       const sortedCountries = [...this.countryData.countries];

       // Sort the copied array
       sortedCountries.sort(
         (a, b) => Number(a.population_rank) - Number(b.population_rank)
       );

       // Assign the sorted array back to the countryData object
       this.countryData.countries = sortedCountries;
        this.currentLanguage = this.getCurrentLang(this.language);
      });
    });
  }

  getCurrentLang(code: string): string {
    const language: any = this.countryData.uniqueLanguages.find(
      (lang: any) => lang.code === code
    );
    return language ? language.name : '';
  }

  toggleFavourite(country: Country): void {
    this.favouriteService.toggleFavourite(country);
  }

  isFavourite(country: Country): boolean {
    return this.favouriteService.isFavourite(country);
  }
}
