import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { Movie } from '../../models/movie.model';
import { FeatherModule } from 'angular-feather';

@Component({
      selector: 'app-discover',
      standalone: true,
      imports: [
            CommonModule,
            FeatherModule,
            CardComponent
      ],
      templateUrl: './discover.component.html',
      styleUrl: './discover.component.scss'
})
export class DiscoverComponent {
      @Input() mode: 'discover' | 'search-result' = 'discover'; 
      @Input() data: Movie[] = [];
}
