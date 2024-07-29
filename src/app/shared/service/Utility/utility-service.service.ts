import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UtilityServiceService {

  constructor() { }

  changeToUpperCase(formName: FormGroup, inputName: string) {
    let formElement = formName.get(inputName)
    formElement?.setValue(formElement.value.toUpperCase())
  }

  firstLetterCapital(formName: FormGroup, inputName: string) {
    let formElement = formName.get(inputName)
    let val = formElement?.value
    if (val.length == 1) {
      formElement?.setValue(formElement.value.toUpperCase())
    }
    else if ((val.length > 1) && (val[val.length - 1] === ' ' && val[val.length - 2] === ' ')) {
      formElement?.setValue(val.substring(0, val.length - 1))
    }
    else if ((val.length > 1) && (val[val.length - 1] !== ' ' && val[val.length - 2] === ' ')) {
      let wordArr = val.split(' ')
      let finalVal = ''
      wordArr.forEach((word: string) => {
        word = word[0].toUpperCase() + word.substring(1, word.length)
        finalVal += (word + ' ')
      });
      formElement?.setValue(finalVal.trim())
    }
  }
  isNumberKey(event: KeyboardEvent): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    }
    return true;
  }
}