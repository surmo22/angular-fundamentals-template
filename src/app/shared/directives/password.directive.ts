import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[appPasswordToggle]',
    standalone: true,
    exportAs: 'passwordToggle'
})
export class PasswordToggleDirective {
    private isPasswordVisible = false;

    constructor(private el: ElementRef) {
        this.el.nativeElement.type = 'password';
    }

    toggleVisibility() {
        this.isPasswordVisible = !this.isPasswordVisible;
        this.el.nativeElement.type = this.isPasswordVisible ? 'text' : 'password';
    }

    get isVisible(): boolean {
        return this.isPasswordVisible;
    }
}
