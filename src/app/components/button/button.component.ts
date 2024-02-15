import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FeatherModule } from 'angular-feather';

@Component({
      selector: 'app-button',
      standalone: true,
      imports: [
            CommonModule,
            FeatherModule
      ],
      templateUrl: './button.component.html',
      styleUrl: './button.component.scss'
})
export class ButtonComponent {
      @Input() type?: 'icon' | 'normal' = 'normal';
      @Input() icon?: string = '';
      @Input() disabled?: boolean = false;
}
