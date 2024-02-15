import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { WatchComponent } from './pages/watch/watch.component';

export const routes: Routes = [
      {
            path: '',
            pathMatch: 'full',
            redirectTo: 'home'
      },
      {
            path: 'home',
            component: HomeComponent
      },
      {
            path: 'watch/:id',
            component: WatchComponent
      }
];
