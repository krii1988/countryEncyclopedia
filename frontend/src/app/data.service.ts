import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Country } from './graphql.service'; // Import the Country model interface

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private filteredCountriesSubject = new BehaviorSubject<Country[]>([]);
  filteredCountries$ = this.filteredCountriesSubject.asObservable();

  setFilteredCountries(countries: Country[]): void {
    this.filteredCountriesSubject.next(countries);
  }

  getFilteredCountries(): Country[] {
    return this.filteredCountriesSubject.getValue();
  }
}
