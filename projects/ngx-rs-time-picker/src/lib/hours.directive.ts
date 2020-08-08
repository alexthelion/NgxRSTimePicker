import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: 'input[hours]'
})
export class HoursDirective {

  constructor(private el: ElementRef) {
  }

  @HostListener('input', ['$event'])
  onInputChange(event): void {
    const initialValue = this.el.nativeElement.value;
    this.el.nativeElement.value = initialValue.replace(/[^0-9]*/g, '');
    let zeroPadding = '';
    this.el.nativeElement.value = this.el.nativeElement.value.replace('0', '');

    if (this.el.nativeElement.value.length > 2) {
      this.el.nativeElement.value = this.el.nativeElement.value.substr(0, 2);
    }

    if (this.el.nativeElement.value.length < 2) {
      for (let i = 0; i < 2 - this.el.nativeElement.value.length; i++) {
        zeroPadding += '0';
      }
    }

    if (this.el.nativeElement.value > 23) {
      this.el.nativeElement.value = '23';
    }

    this.el.nativeElement.value = zeroPadding + this.el.nativeElement.value;

    if (initialValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
  }

}
