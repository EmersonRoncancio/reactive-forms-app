import { Routes } from "@angular/router";


export const authRoutes: Routes= [
  {
    path: '',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./pages/registry-page/registry-page.component').then(m => m.RegistryPageComponent)
      },
      {
        path: 'signup',
        redirectTo: 'login'
      }
    ]
  },
]
