import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes,
    // withHashLocation(),
    withInMemoryScrolling({scrollPositionRestoration:"top"}),
    withViewTransitions()
  ),
  provideHttpClient(withFetch())
  , provideClientHydration(withEventReplay()),
  provideAnimations(),
  provideToastr(),
  importProvidersFrom([SweetAlert2Module.forRoot()]),

]
};
