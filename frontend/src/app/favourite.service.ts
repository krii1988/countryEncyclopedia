import { Injectable } from '@angular/core';
import { Country } from './graphql.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavouriteService {
  private readonly STORAGE_KEY = 'favouriteCountries';
  private favouritesChangedSubject = new Subject<Country[]>(); // Subject for emitting changes

  constructor() {}

  toggleFavourite(country: Country): void {
    const favourites = this.getFavourites();
    const index = favourites.findIndex(
      (favourite) => favourite.id === country.id
    );
    if (index !== -1) {
      // If already favourite, remove from favourites
      favourites.splice(index, 1);
    } else {
      // Otherwise, add to favourites
      favourites.push(country);
    }
    // Save updated favourites to local storage
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favourites));
    this.favouritesChangedSubject.next(favourites); // Emit changes
  }

  isFavourite(country: Country): boolean {
    const favourites = this.getFavourites();
    return favourites.some((favourite) => favourite.id === country.id);
  }

  // Make getFavourites method public
  public getFavourites(): Country[] {
    const favouritesJSON = localStorage.getItem(this.STORAGE_KEY);
    return favouritesJSON ? JSON.parse(favouritesJSON) : [];
  }

  // Observable to subscribe for changes
  favouritesChanged() {
    return this.favouritesChangedSubject.asObservable();
  }
}
