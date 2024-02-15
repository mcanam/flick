import { Component } from '@angular/core';
import { FeatherModule } from 'angular-feather';
import { SearchComponent } from '../../components/search/search.component';
import { DiscoverComponent } from '../../components/discover/discover.component';
import { Movie } from '../../models/movie.model';
import { LoaderComponent } from '../../components/loader/loader.component';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movie.service';
import { Subscription } from 'rxjs';

@Component({
      selector: 'app-home',
      standalone: true,
      imports: [
            CommonModule,
            FeatherModule,
            SearchComponent,
            DiscoverComponent,
            LoaderComponent
      ],
      templateUrl: './home.component.html',
      styleUrl: './home.component.scss'
})
export class HomeComponent {
      subcription: Subscription = new Subscription();
      isLoading: boolean = false;
      mode: 'discover' | 'search-result' = 'discover';
      data: Movie[] = [];

      constructor(private movieService: MovieService) { }

      ngOnInit() {
            this.getDiscover();
      }

      onSearch(title: string) {
            title ? this.getMovie(title) : this.getDiscover();
      }

      getDiscover() {
            this.isLoading = true;
            this.mode = 'discover';

            this.subcription.add(
                  this.movieService.discover().subscribe({
                        next: data => {
                              this.data = data;
                              this.isLoading = false;
                        },
                        error: error => {
                              this.data = [];
                              this.isLoading = false;
                        }
                  })
            );
      }

      getMovie(title: string) {
            this.isLoading = true;
            this.mode = 'search-result';

            this.subcription.add(
                  this.movieService.search(title).subscribe({
                        next: data => {
                              this.data = data;
                              this.isLoading = false;
                        },
                        error: error => {
                              this.data = [];
                              this.isLoading = false;
                        }
                  })
            );
      }

      ngOnDestroy() {
            this.subcription.unsubscribe();
      }
}
