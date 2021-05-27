import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: 'input[hours]'
})
export class HoursDirective {
  @Input() max = 23;

  constructor(private el: ElementRef) {
  }

  @HostListener('input', ['$event'])
  onInputChange(event): void {
    const initialValue = this.el.nativeElement.value;
    this.el.nativeElement.value = initialValue.replace(/[^0-9]*/g, '');
    let zeroPadding = '';
    this.el.nativeElement.value = this.el.nativeElement.value.replace('0', '');

    if (this.el.nativeElement.value.length > this.max.toString().length) {
      this.el.nativeElement.value = this.el.nativeElement.value.substr(0, this.max.toString().length);
    }

    if (this.el.nativeElement.value.length < this.max.toString().length) {
      for (let i = 0; i < this.max.toString().length - this.el.nativeElement.value.length; i++) {
        zeroPadding += '0';
      }
    }

    if (this.el.nativeElement.value >= this.max) {
      this.el.nativeElement.value = (this.max - 1).toString();
    }

    this.el.nativeElement.value = zeroPadding + this.el.nativeElement.value;

    if (initialValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
  }

}
