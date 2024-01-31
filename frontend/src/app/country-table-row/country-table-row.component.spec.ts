import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryTableRowComponent } from './country-table-row.component';

describe('CountryTableRowComponent', () => {
  let component: CountryTableRowComponent;
  let fixture: ComponentFixture<CountryTableRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryTableRowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CountryTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
