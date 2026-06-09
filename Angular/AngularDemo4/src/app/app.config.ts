import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),

    // By default, it uses the 'PathLocationStrategy' to handle the routing.
    provideRouter(routes)

    // We can change it to HashLocationStrategy by providing 'withHashLocation()' option.
    // provideRouter(routes, withHashLocation())
  ]
};
