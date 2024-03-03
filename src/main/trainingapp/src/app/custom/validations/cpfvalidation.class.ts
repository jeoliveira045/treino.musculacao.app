import {Injectable} from "@angular/core";
import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export class CPFValidatorClass {
  static CPFValidator(): ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null => {
      return this.cpfLastTwoNumbersValidation(control.value) ?
        {cpf: {value: control.value}} : null
    }
  }

  static cpfLastTwoNumbersValidation(cpf: string): boolean{
    cpf = cpf.replace(/[\.\-]/g, '')
    let digitOne = 0
    let digitTwo = 0
    let digits: any[] = []
    let somaPonderadaFator = 1
    for(let number = cpf.length - 2 ; number >= 0; number--){
      ++somaPonderadaFator
      let d1 = 0
      if(number-1 >= 0) {
        d1 = parseInt(cpf[number-1]) * somaPonderadaFator
        digitOne += d1
      }
      let d2 = parseInt(cpf[number]) * somaPonderadaFator
      digitTwo += d2
    }
    digitOne = 11 - (digitOne % 11)
    digitTwo = (digitTwo % 11)
    digits.push(digitOne)
    digits.push(digitTwo)
    return (cpf[cpf.length - 2] != digits[0] || cpf[cpf.length -1] != digits[1])
  }
}
