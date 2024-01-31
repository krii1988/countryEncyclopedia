import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteCountriesComponent } from './favourite-countries.component';

describe('FavouriteCountriesComponent', () => {
  let component: FavouriteCountriesComponent;
  let fixture: ComponentFixture<FavouriteCountriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavouriteCountriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FavouriteCountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
