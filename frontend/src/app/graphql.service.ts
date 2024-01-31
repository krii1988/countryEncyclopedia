import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Apollo, gql } from 'apollo-angular';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';

// Define the interface for the country data
export interface Country {
  id: string;
  common_name: string;
  official_name: string;
  country_code: string;
  translations: Translation[];
  population: number;
  population_rank: number;
  flag: string;
  area: number;
  borders: string;
  languages: string;
}

interface Translation {
  code: string;
  official: string;
  common: string;
}

export interface CountryData {
  countries: Country[];
  uniqueLanguages: string[];
}

@Injectable({
  providedIn: 'root',
})
export class GraphqlService {
  constructor(private apollo: Apollo) {}

  getAllCountries(query: string = ''): Observable<Country[]> {
    return this.apollo
      .query<{ countries: Country[] }>({
        query: gql`
          query {
            countries {
              id
              common_name
              official_name
              country_code
              translations
              population
              population_rank
              flag
              area
              borders
              languages
            }
          }
        `,
      })
      .pipe(
        map((result) => {
          const countries = result.data.countries ?? [];
          if (query.trim() !== '') {
            const lowerCaseQuery = query.toLowerCase();
            return countries.filter((country) =>
              this.countryMatchesQuery(country, lowerCaseQuery)
            );
          } else {
            return countries;
          }
        }),
        catchError(this.handleError)
      );
  }

  private countryMatchesQuery(country: Country, query: string): boolean {
    // Check if the country name or any translation matches the query
    return (
      country.common_name.toLowerCase().includes(query) ||
      country.official_name.toLowerCase().includes(query) ||
      this.translationsMatchQuery(country.translations, query)
    );
  }

  private translationsMatchQuery(
    translations: string | Translation[],
    query: string
  ): boolean {
    if (typeof translations === 'string') {
      try {
        const parsedTranslations: Translation[] = JSON.parse(translations);
        return parsedTranslations.some((translation: Translation) =>
          Object.values(translation).some((value: string) =>
            value.toLowerCase().includes(query)
          )
        );
      } catch (error) {
        console.error('Error parsing translations:', error);
        return false;
      }
    } else {
      // If translations is already an array of Translation objects
      return translations.some((translation: Translation) =>
        Object.values(translation).some((value: string) =>
          value.toLowerCase().includes(query)
        )
      );
    }
  }

  getCountryByCode(country_code: string): Observable<Country | null> {
    return this.apollo
      .query<{ countryByCode: Country | null }>({
        // Updated alias to match the response field name
        query: gql`
          query GetCountryByCode($country_code: String!) {
            countryByCode(country_code: $country_code) {
              id
              common_name
              official_name
              country_code
              translations
              population
              population_rank
              flag
              area
              borders
              languages
            }
          }
        `,
        variables: {
          country_code: country_code,
        },
      })
      .pipe(
        map((result) => {
          return result.data.countryByCode ?? null; // Accessing the correct response field
        })
      );
  }

  getCountriesByLanguage(language: string): Observable<CountryData> {
    return this.apollo
      .query<{ countriesByLanguage: Country[] }>({
        query: gql`
          query GetCountriesByLanguage($language: String!) {
            countriesByLanguage(language: $language) {
              id
              common_name
              official_name
              country_code
              translations
              population
              population_rank
              flag
              area
              borders
              languages
            }
          }
        `,
        variables: {
          language: language,
        },
      })
      .pipe(
        map((result) => {
          const countries = result.data.countriesByLanguage || [];
          const allLanguages: string[] = countries.flatMap(
            (country) => JSON.parse(country.languages) as string[]
          );
          const uniqueLanguages = Array.from(new Set(allLanguages));
          return {
            countries: countries,
            uniqueLanguages: uniqueLanguages,
          };
        })
      );
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }
}
