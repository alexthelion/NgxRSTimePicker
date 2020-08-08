import { NgModule } from '@angular/core';
import { NgxRsTimePickerComponent } from './ngx-rs-time-picker.component';
import {MinutesDirective} from './minutes.directive';
import {HoursDirective} from './hours.directive';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [NgxRsTimePickerComponent, HoursDirective, MinutesDirective],
  imports: [
    CommonModule,
    BrowserModule
  ],
  exports: [NgxRsTimePickerComponent]
})
export class NgxRsTimePickerModule { }
