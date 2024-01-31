import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-country-table-row',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './country-table-row.component.html',
  styleUrl: './country-table-row.component.css',
})
export class CountryTableRowComponent {
  @Input() label!: string;
}
