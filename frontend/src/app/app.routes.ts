import { Routes } from '@angular/router';
import { CountryDetailComponent } from './country-detail/country-detail.component'; // Import the component
import { CountryComponent } from './countries/countries.component'; // Import the component
import { ByLanguageComponent } from './by-language/by-language.component'; // Import the component
import { FavouriteCountriesComponent } from './favourite-countries/favourite-countries.component';



export const routes: Routes = [
  { path: '', component: CountryComponent }, // Define the default route
  { path: 'country/:country_code', component: CountryDetailComponent }, // Define the route with a parameter
  { path: 'lang/:language', component: ByLanguageComponent }, // Define the route with a parameter
  { path: 'favourites', component: FavouriteCountriesComponent }, // Define the route with a parameter
];
