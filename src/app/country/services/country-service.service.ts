import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { Country } from '../interfaces/contry.interface';

@Injectable({
  providedIn: 'root',
})
export class CountryServiceService {
  constructor() {}

  http = inject(HttpClient);

  urlGetAllCountries =
    'https://restcountries.com/v3.1/region/americas?fields=cca3,name,borders';

  private regions = ['africa', 'americas', 'asia', 'europe', 'oceania'];

  get regionsList(): string[] {
    return [...this.regions];
  }

  getRegionCountries(region: string): Observable<Country[]> {
    if (!region) return of([]);

    return this.http
      .get<Country[]>(
        `https://restcountries.com/v3.1/region/${region}?fields=cca3,name,borders`
      )
      .pipe(
        map((countries) => {
          return countries;
        })
      );
  }

  getAlphaCodeCountrie(alphaCode: string): Observable<Country> {
    return this.http.get<Country>(
      `https://restcountries.com/v3.1/alpha/${alphaCode}?fields=cca3,name,borders`
    );
  }
}
