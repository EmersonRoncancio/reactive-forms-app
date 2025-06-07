import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { CountryServiceService } from '../../services/country-service.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { count, map, of, switchMap, tap } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { Country } from '../../interfaces/contry.interface';

@Component({
  selector: 'app-country-page',
  imports: [ReactiveFormsModule],
  templateUrl: './country-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryPageComponent {
  countryService = inject(CountryServiceService);

  fb = inject(FormBuilder);

  getAllCountries(region: string) {
    console.log('getAllCountries', region);
  }

  regionSelected = signal<string>('');
  alphaCode = signal<string>('');

  myForm = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required],
  });

  onFormChange = effect((onCleanup) => {
    const getReggionChange = this.myForm
      .get('region')
      ?.valueChanges.pipe(
        tap(() => {
          this.myForm.get('country')?.setValue('');
        })
      )
      .subscribe((region) => {
        console.log('Selected region:', region);
        this.regionSelected.set(region!);
      });

    const getCountryChange = this.myForm
      .get('country')
      ?.valueChanges.pipe(
        tap(() => {
          this.myForm.get('border')?.setValue('');
        })
      )
      .subscribe((country) => {
        this.alphaCode.set(country!);
      });

    onCleanup(() => {
      getReggionChange?.unsubscribe();
      getCountryChange?.unsubscribe();
    });
  });

  getContries = rxResource({
    request: () => ({ region: this.regionSelected() }),
    loader: ({ request }) => {
      if (!request) return of([]);

      return this.countryService.getRegionCountries(request.region);
    },
  });

  getBorders = rxResource({
    request: () => ({ country: this.alphaCode() }),
    loader: ({ request }) => {
      if (!request) return of([]);

      return this.countryService.getAlphaCodeCountrie(request.country).pipe(
        switchMap((country: Country) => {
          const data = this.countryService.getAllCountries(country.borders);
          return data;
        })
      );
    },
  });
}
