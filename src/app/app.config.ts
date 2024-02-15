import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
      providers: [
            provideRouter(routes),
            provideHttpClient(withFetch()),
            importProvidersFrom(FeatherModule.pick(allIcons))
      ]
};
