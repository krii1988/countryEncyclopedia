// country-card.component.ts

import { Component, Input, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GraphqlService } from './../graphql.service';
import { Country } from './../graphql.service';
import { DataService } from './../data.service';
import { FavouriteService } from './../favourite.service';

@Component({
  selector: 'app-country-card',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './country-card.component.html',
  styleUrls: ['./country-card.component.css'],
})
export class CountryCardComponent implements OnInit {
  @Input() country!: Country;
  @Input() isFavourite!: (country: Country) => boolean;
  @Input() toggleFavourite!: (country: Country) => void;

  constructor(
    private graphqlService: GraphqlService,
    private dataService: DataService,
    private favouriteService: FavouriteService
  ) {}

  ngOnInit(): void {}
}
