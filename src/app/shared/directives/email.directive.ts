import { Directive } from "@angular/core";
import {AbstractControl, ValidationErrors, Validator} from "@angular/forms";

@Directive({
    selector: '[emailValidator]',
    providers: [/*Add your code here*/]
})
export class EmailValidatorDirective implements Validator {
    registerOnValidatorChange?(fn: () => void): void {
        throw new Error("Method not implemented.");
    }

    validate(control: AbstractControl): ValidationErrors | null {
        return null;
    }
    // Add your code here
}
