// card-number-mask.directive.ts
import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[cardNumberMask]',
})
export class CardNumberMaskDirective {
  @HostListener('input', ['$event'])
  onInput(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    let trimmedValue = input.value.replace(/\s+/g, ''); // Remove existing spaces
    const cardNumberLength = 16; // Adjust this if your card number length differs

    if (trimmedValue.length > cardNumberLength) {
      trimmedValue = trimmedValue.slice(0, cardNumberLength);
    }

    let maskedValue = '';
    for (let i = 0; i < trimmedValue.length; i += 4) {
      maskedValue += trimmedValue.slice(i, i + 4) + ' ';
    }

    input.value = maskedValue.trim();
  }
}
