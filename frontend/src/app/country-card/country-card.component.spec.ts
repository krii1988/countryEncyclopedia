import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Country } from './../graphql.service';
import { CountryCardComponent } from './country-card.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';

describe('CountryCardComponent', () => {
  let component: CountryCardComponent;
  let fixture: ComponentFixture<CountryCardComponent>;

  // Mock country data
  const mockCountry: Country = {
    id: '122',
    common_name: 'Mockland',
    official_name: 'The United States of Mock',
    country_code: 'MCK',
    translations:
      [{"code":"ara","official":"\\u062c\\u0645\\u0647\\u0648\\u0631\\u064a\\u0629 \\u0627\\u0644\\u0635\\u064a\\u0646 \\u0627\\u0644\\u0634\\u0639\\u0628\\u064a\\u0629","common":"\\u0627\\u0644\\u0635\\u064a\\u0646"},{"code":"bre","official":"Republik Pobl Sina","common":"Sina"},{"code":"ces","official":"\\u010c\\u00ednsk\\u00e1 lidov\\u00e1 republika","common":"\\u010c\\u00edna"},{"code":"cym","official":"Gweriniaeth Pobl Tsieina","common":"Tsieina"},{"code":"deu","official":"Volksrepublik China","common":"China"},{"code":"est","official":"Hiina Rahvavabariik","common":"Hiina"},{"code":"fin","official":"Kiinan kansantasavalta","common":"Kiina"},{"code":"fra","official":"R\\u00e9publique populaire de Chine","common":"Chine"},{"code":"hrv","official":"Narodna Republika Kina","common":"Kina"},{"code":"hun","official":"K\\u00ednai N\\u00e9pk\\u00f6zt\\u00e1rsas\\u00e1g","common":"K\\u00edna"},{"code":"ita","official":"Repubblica popolare cinese","common":"Cina"},{"code":"jpn","official":"\\u4e2d\\u83ef\\u4eba\\u6c11\\u5171\\u548c\\u56fd","common":"\\u4e2d\\u56fd"},{"code":"kor","official":"\\uc911\\ud654\\uc778\\ubbfc\\uacf5\\ud654\\uad6d","common":"\\uc911\\uad6d"},{"code":"nld","official":"Volksrepubliek China","common":"China"},{"code":"per","official":"\\u062c\\u0645\\u0647\\u0648\\u0631\\u06cc \\u062e\\u0644\\u0642 \\u0686\\u06cc\\u0646","common":"\\u0686\\u06cc\\u0646"},{"code":"pol","official":"Chi\\u0144ska Republika Ludowa","common":"Chiny"},{"code":"por","official":"Rep\\u00fablica Popular da China","common":"China"},{"code":"rus","official":"\\u041d\\u0430\\u0440\\u043e\\u0434\\u043d\\u0430\\u044f \\u0420\\u0435\\u0441\\u043f\\u0443\\u0431\\u043b\\u0438\\u043a\\u0430 \\u041a\\u0438\\u0442\\u0430\\u0439","common":"\\u041a\\u0438\\u0442\\u0430\\u0439"},{"code":"slk","official":"\\u010c\\u00ednska \\u013eudov\\u00e1 republika","common":"\\u010c\\u00edna"},{"code":"spa","official":"Rep\\u00fablica Popular de China","common":"China"},{"code":"srp","official":"\\u041d\\u0430\\u0440\\u043e\\u0434\\u043d\\u0430 \\u0420\\u0435\\u043f\\u0443\\u0431\\u043b\\u0438\\u043a\\u0430 \\u041a\\u0438\\u043d\\u0430","common":"\\u041a\\u0438\\u043d\\u0430"},{"code":"swe","official":"Folkrepubliken Kina","common":"Kina"},{"code":"tur","official":"\\u00c7in Halk Cumhuriyeti","common":"\\u00c7in"},{"code":"urd","official":"\\u0639\\u0648\\u0627\\u0645\\u06cc \\u062c\\u0645\\u06c1\\u0648\\u0631\\u06cc\\u06c1 \\u0686\\u06cc\\u0646","common":"\\u0686\\u06cc\\u0646"}],
    population: 1000000,
    population_rank: 22,
    flag: '🏁',
    area: 1000000,
    borders:
      '["AFG","BTN","MMR","HKG","IND","KAZ","NPL","PRK","KGZ","LAO","MAC","MNG","PAK","RUS","TJK","VNM"]',
    languages: '[{"code":"zho","name":"Chinese"}]',
  };

  // Mock functions for isFavourite and toggleFavourite
  const mockIsFavourite = jasmine.createSpy('isFavourite');
  const mockToggleFavourite = jasmine.createSpy('toggleFavourite');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CountryCardComponent,
        CommonModule,
        RouterModule,
        RouterTestingModule,
        ApolloTestingModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryCardComponent);
    component = fixture.componentInstance;
    component.country = mockCountry;
    component.isFavourite = mockIsFavourite;
    component.toggleFavourite = mockToggleFavourite;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display country common_name', () => {
    const compiled = fixture.nativeElement;
    expect(
      compiled.querySelector('.country-common_name').textContent
    ).toContain(mockCountry.common_name);
  });

  it('should display country official_name', () => {
    const compiled = fixture.nativeElement;
    expect(
      compiled.querySelector('.country-official_name').textContent
    ).toContain(mockCountry.official_name);
  });

  it('should display country population', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.country-population').textContent).toContain(
      Number(mockCountry.population).toLocaleString()
    );
  });

  it('should call isFavourite function when checking if country is a favourite', () => {
    component.isFavourite(mockCountry);
    expect(mockIsFavourite).toHaveBeenCalledWith(mockCountry);
  });

  it('should call toggleFavourite function when toggling favourite status', () => {
    component.toggleFavourite(mockCountry);
    expect(mockToggleFavourite).toHaveBeenCalledWith(mockCountry);
  });
});
