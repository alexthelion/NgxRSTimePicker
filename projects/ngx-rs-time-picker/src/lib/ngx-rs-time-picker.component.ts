import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {fromEvent, Subscription, timer} from 'rxjs';
import {debounce, map} from 'rxjs/operators';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';

export interface Time {
  hour: string;
  minute: string;
}

@Component({
  selector: 'ngx-rs-time-picker',
  templateUrl: './ngx-rs-time-picker.component.html',
  styleUrls: ['./ngx-rs-time-picker.component.scss']
})
export class NgxRsTimePickerComponent implements OnInit, AfterViewInit, OnDestroy {
  hours: string[] = [];
  minutes: string[] = [];
  selectedHour = '00';
  selectedMinute = '00';
  @Input() pickTimeText = 'Pick Time';
  @Output() pickedTime: EventEmitter<Time> = new EventEmitter<Time>();
  @ViewChild('hoursList') hoursList: ElementRef;
  @ViewChild('minutesList') minutesList: ElementRef;
  @Input() date: Date;
  @Input() primaryColor = 'darkblue';
  @Input() backgroundColor = 'white';
  @Input() textColor = 'black';
  @Input() inputControlBackgroundColor = 'white';
  @Input() enableAnimation = true;
  @Input() maxHours = 24;
  @Input() manualInput = true;
  @Input() width = '350';
  @ViewChild('hoursInput') hoursInput: ElementRef;
  @ViewChild('minutesInput') minutesInput: ElementRef;
  hoursInputWidth = '3rem';
  private hoursInput$: Subscription;
  private minutesInput$: Subscription;
  private readonly KEY_UP_DELAY_TIME = 500;
  @ViewChild('hoursViewPort') hoursViewPort: CdkVirtualScrollViewport;
  @ViewChild('minutesViewPort') minutesViewPort: CdkVirtualScrollViewport;
  @Input() unitHeight = 64;

  constructor() {
  }

  ngOnInit(): void {
    if (this.maxHours > 9) {
      this.hoursInputWidth = this.maxHours.toString().length + 1 + 'rem';
    }

    for (let i = 0; i < this.maxHours; i++) {
      this.hours.push(i < 10 ? '0' + i + '' : i + '');
    }
    for (let i = 0; i < 60; i++) {
      this.minutes.push(i < 10 ? '0' + i + '' : i + '');
    }
  }

  ngAfterViewInit(): void {
    if (this.date) {
      setTimeout(() => {
        this.selectedHour = String(this.date.getHours() < 10 ? '0' + this.date.getHours() : this.date.getHours());
        this.scrollToActiveHour();
        this.selectedMinute = String(this.date.getMinutes() < 10 ? '0' + this.date.getMinutes() : this.date.getMinutes());
        this.scrollToActiveMinute();
      }, 300);
    }

    if (this.manualInput) {
      this.hoursInput$ = fromEvent(this.hoursInput.nativeElement, 'keyup').pipe(map((x: any) => {
          return x.currentTarget.value;
        }), debounce(x => timer(this.KEY_UP_DELAY_TIME))
      ).subscribe(hours => this.setSelectedHour(hours));

      this.minutesInput$ = fromEvent(this.minutesInput.nativeElement, 'keyup').pipe(map((x: any) => {
          return x.currentTarget.value;
        }), debounce(x => timer(this.KEY_UP_DELAY_TIME))
      ).subscribe(minutes => this.setSelectedMinute(minutes));
    }
  }

  setHours(hour: string): void {
    this.selectedHour = hour;
  }

  setMinutes(minute: string): void {
    this.selectedMinute = minute;
  }

  pickedTimeBtnClicked(): void {
    this.pickedTime.emit({hour: this.selectedHour, minute: this.selectedMinute});
  }

  setSelectedHour(value): void {
    const valueWithoutZeros = value.replace(/^0+/, '');
    this.selectedHour = valueWithoutZeros.toString().length < 2 ? '0' + valueWithoutZeros : valueWithoutZeros;
    this.scrollToActiveHour();
  }

  private scrollToActiveHour(): void {
    this.hoursViewPort.scrollToIndex(this.hours.indexOf(this.selectedHour));
  }

  setSelectedMinute(value): void {
    this.selectedMinute = value;
    this.scrollToActiveMinute();
  }

  private scrollToActiveMinute(): void {
    this.minutesViewPort.scrollToIndex(this.minutes.indexOf(this.selectedMinute));
  }

  ngOnDestroy(): void {
    this.hoursInput$.unsubscribe();
    this.minutesInput$.unsubscribe();
  }
}
