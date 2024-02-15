import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { Router } from '@angular/router';

@Component({
      selector: 'app-card',
      standalone: true,
      imports: [],
      templateUrl: './card.component.html',
      styleUrl: './card.component.scss'
})
export class CardComponent {
      @Input() data!: Movie;
      @Output() $click: EventEmitter<number> = new EventEmitter<number>();

      constructor(private router: Router) { }

      onClick() {
            this.router.navigate(['watch', this.data.id]);
      }
}
