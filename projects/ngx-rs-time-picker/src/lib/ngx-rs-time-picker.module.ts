import {NgModule} from '@angular/core';
import {NgxRsTimePickerComponent} from './ngx-rs-time-picker.component';
import {MinutesDirective} from './minutes.directive';
import {HoursDirective} from './hours.directive';
import {CommonModule} from '@angular/common';
import {ScrollingModule} from '@angular/cdk/scrolling';

@NgModule({
  declarations: [NgxRsTimePickerComponent, HoursDirective, MinutesDirective],
  imports: [
    CommonModule,
    ScrollingModule
  ],
  exports: [NgxRsTimePickerComponent]
})
export class NgxRsTimePickerModule { }
