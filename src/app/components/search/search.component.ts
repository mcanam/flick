import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FeatherModule } from 'angular-feather';
import { Subscription, debounceTime } from 'rxjs';

@Component({
      selector: 'app-search',
      standalone: true,
      imports: [
            ReactiveFormsModule,
            CommonModule,
            FeatherModule
      ],
      templateUrl: './search.component.html',
      styleUrl: './search.component.scss'
})
export class SearchComponent {
      @Output() $search: EventEmitter<string> = new EventEmitter<string>();

      subscription: Subscription = new Subscription();
      form: FormControl = new FormControl('');

      ngOnInit() {
            this.subscription.add(
                  this.form.valueChanges.pipe(debounceTime(300)).subscribe({
                        next: value => this.$search.emit(value)
                  })
            );
      }

      ngOnDestroy() {
            this.subscription.unsubscribe();
      }
}
