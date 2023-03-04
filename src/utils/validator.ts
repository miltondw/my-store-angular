import {AbstractControl} from '@angular/forms'

export class MyValidators {

  static rango(control:AbstractControl){
    const rangePriceMin=control.get('rangePriceMin')?.value
    const rangePriceMax=control.get('rangePriceMax')?.value
    if(rangePriceMin>=10 && rangePriceMax<=100 && rangePriceMin < rangePriceMax ){
      return null
    }
    return {
      invalid_range:true
    }
  }
}
