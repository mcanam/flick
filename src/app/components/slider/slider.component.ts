import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
      selector: 'app-slider',
      standalone: true,
      imports: [
            CommonModule
      ],
      templateUrl: './slider.component.html',
      styleUrl: './slider.component.scss'
})
export class SliderComponent {
      @Input() min: number = 0;
      @Input() max: number = 100;
      @Input() step?: number = 1;
      @Input() value: number = 0;
      @Output() $slide: EventEmitter<number> = new EventEmitter<number>();
      @Output() $slideEnd: EventEmitter<number> = new EventEmitter<number>();

      fillWidth: string = '0%';
      localValue: number = 0;

      ngOnChanges() {
            this.localValue = this.value;
            this.updateFill();
      }

      onInput(value: string) {
            this.localValue = parseFloat(value);
            this.$slide.emit(this.localValue);
            this.updateFill();
      }

      onChange() {
            this.$slideEnd.emit(this.localValue);
      }

      updateFill() {
            this.fillWidth = (this.localValue / this.max * 100) + '%';
      }
}
