import { Routes } from "@angular/router";


export const countryRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/country-page/country-page.component').then(m => m.CountryPageComponent)
  }
]
