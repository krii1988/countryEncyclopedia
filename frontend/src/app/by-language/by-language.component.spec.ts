import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ByLanguageComponent } from './by-language.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';

describe('ByLanguageComponent', () => {
  let component: ByLanguageComponent;
  let fixture: ComponentFixture<ByLanguageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ByLanguageComponent, RouterTestingModule, ApolloTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ByLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
