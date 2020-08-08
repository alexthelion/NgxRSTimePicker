import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

export interface Time {
  hour: string;
  minute: string;
}

@Component({
  selector: 'NgxRSTimePicker',
  templateUrl: './ngx-rs-time-picker.component.html',
  styleUrls: ['./ngx-rs-time-picker.component.scss']
})
export class NgxRsTimePickerComponent implements OnInit, AfterViewInit {
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

  constructor() {
    for (let i = 0; i < 24; i++) {
      this.hours.push(i < 10 ? '0' + i + '' : i + '');
    }
    for (let i = 0; i < 60; i++) {
      this.minutes.push(i < 10 ? '0' + i + '' : i + '');
    }
  }

  ngOnInit(): void {
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

  setSelectedHour(event): void {
    this.selectedHour = event.target.value;
    this.scrollToActiveHour();
  }

  private scrollToActiveHour(): void {
    let offsetTop = 0;
    for (const item of this.hoursList.nativeElement.children) {
      if (item.textContent === this.selectedHour) {
        offsetTop = item.offsetTop;
      }
    }

    this.hoursList.nativeElement.scrollTop = offsetTop;
  }

  setSelectedMinute(event): void {
    this.selectedMinute = event.target.value;
    this.scrollToActiveMinute();
  }

  private scrollToActiveMinute(): void {
    let offsetTop = 0;
    for (const item of this.minutesList.nativeElement.children) {
      if (item.textContent === this.selectedMinute) {
        offsetTop = item.offsetTop;
      }
    }

    this.minutesList.nativeElement.scrollTop = offsetTop;
  }
}
