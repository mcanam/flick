import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { SliderComponent } from '../slider/slider.component';

@Component({
      selector: 'app-player',
      standalone: true,
      imports: [
            CommonModule,
            ButtonComponent,
            SliderComponent
      ],
      templateUrl: './player.component.html',
      styleUrl: './player.component.scss'
})
export class PlayerComponent {
      @ViewChild('video') videoRef: ElementRef | null = null;

      video: HTMLVideoElement | null = null;
      isReady: boolean = false;
      isPlaying: boolean = false;
      isSliding: boolean = false;
      isFullscreen: boolean = false;
      isMuted: boolean = false;
      duration: number = 0;
      currentTime: number = 0;
      volume: number = 1;

      ngAfterViewInit() {
            this.video = this.videoRef?.nativeElement;

            this.video?.addEventListener('loadedmetadata', () => {
                  this.isReady = true;
                  this.duration = this.video!.duration;
            });

            this.video?.addEventListener('timeupdate', () => {
                  if (this.isSliding) return;
                  this.currentTime = this.video!.currentTime;
            });
      }

      onPlayPause() {
            if (!this.video) return;
            this.isPlaying ? this.video.pause() : this.video.play();
            this.isPlaying = !this.isPlaying;
      }

      onTimeSlide() {
            this.isSliding = true;
      }

      onTimeSlideEnd(value: number) {
            this.isSliding = false;
            this.video && (this.video.currentTime = value);
      }

      onFullscreen() {
            this.isFullscreen ? document.exitFullscreen() : document.documentElement.requestFullscreen();
            this.isFullscreen = !this.isFullscreen;
      }

      onVolume() {
            this.isMuted = !this.isMuted;
            this.volume = (!this.isMuted && this.volume == 0) ? 1 : this.volume;
            this.video && (this.video.volume = this.isMuted ? 0 : this.volume);
      }

      onVolumeSlide(value: number) {
            this.volume = value;
            this.isMuted = value == 0;
            this.video && (this.video.volume = this.volume);
      }

      formatTime(seconds: number) {
            let h: number | string = Math.floor(seconds / 3600);
            let m: number | string = Math.floor((seconds % 3600) / 60);
            let s: number | string = Math.floor(seconds % 60);

            h = String(h).padStart(1, '0');
            m = String(m).padStart(2, '0');
            s = String(s).padStart(2, '0');

            return `${h}.${m}.${s}`;
      }
}
