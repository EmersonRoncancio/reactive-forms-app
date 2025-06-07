import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { combineLatest, map, Observable, of, tap } from 'rxjs';
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
          console.log('getRegionCountries', countries);
          return countries;
        })
      );
  }

  getAlphaCodeCountrie(alphaCode: string): Observable<Country> {
    return this.http.get<Country>(
      `https://restcountries.com/v3.1/alpha/${alphaCode}?fields=cca3,name,borders`
    );
  }

  getAllCountries(alphaCodes: string[]): Observable<Country[]> {
    if (!alphaCodes || alphaCodes.length === 0) {
      return of([]);
    }

    const requestsCountries: Observable<Country>[] = [];

    alphaCodes.forEach((alphaCodes) => {
      const request = this.getAlphaCodeCountrie(alphaCodes);
      requestsCountries.push(request);
    });

    console.log('getAllCountries', requestsCountries);
    return combineLatest(requestsCountries);
  }
}
