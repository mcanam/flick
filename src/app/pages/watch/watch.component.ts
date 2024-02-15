import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { PlayerComponent } from '../../components/player/player.component';
import { ButtonComponent } from '../../components/button/button.component';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import Hls from 'hls.js';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
      selector: 'app-watch',
      standalone: true,
      imports: [
            CommonModule,
            PlayerComponent,
            ButtonComponent,
            LoaderComponent
      ],
      templateUrl: './watch.component.html',
      styleUrl: './watch.component.scss'
})
export class WatchComponent {
      @ViewChild('video') videoRef: ElementRef | null = null;

      video: HTMLVideoElement | null = null;
      subcription: Subscription = new Subscription();
      id: string | null = null;
      isHeaderVisible: boolean = true;
      isLoading: boolean = true;
      isMobile: boolean = window.screen.width < 720;
      timeout: any;

      constructor(
            private location: Location,
            private route: ActivatedRoute,
            private movieService: MovieService
      ) { }

      ngAfterViewInit() {
            this.id = this.route.snapshot.paramMap.get('id');
            this.video = this.videoRef?.nativeElement;

            if (this.id && this.video) {
                  this.getMovie();
            }
      }

      getMovie() {
            this.isLoading = true;

            this.subcription.add(
                  this.movieService.watch(this.id!).subscribe({
                        next: data => {
                              if (data.type == 'hls') {
                                    const hls = new Hls();
                                    
                                    hls.loadSource(data.playlist);
                                    hls.attachMedia(this.video!);
                                    this.video?.play();

                                    if (!this.isMobile) this.isHeaderVisible = false;
                              }

                              this.isLoading = false;
                        },
                        error: error => {
                              console.log(error);
                              this.isLoading = false;
                        }
                  })
            );
      }

      onBack() {
            this.location.back();
      }

      onMouseMove() {
            if (this.isLoading) return;
            if (this.timeout) clearTimeout(this.timeout);

            this.isHeaderVisible = true;
            this.timeout = setTimeout(() => this.isHeaderVisible = false, 4000); 
      }

      ngOnDestroy() {
            this.subcription.unsubscribe();
            clearTimeout(this.timeout);
      }
}
