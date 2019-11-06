import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[numOnly]'
})
export class OnlynumDirective {

  constructor(private _el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event) {
    const initalValue = this._el.nativeElement.value;

    this._el.nativeElement.value = initalValue.replace(/\D*/g, '');
    if ( initalValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
  }
}