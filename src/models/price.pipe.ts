import {Pipe, PipeTransform} from "@angular/core";

@Pipe({ name: 'pricestr' })
export class PricestrPipe implements PipeTransform {
  transform(price: number) {
    price = Math.round(price * 100) / 100;
    return new Intl.NumberFormat(
      'en-US',
      { style: 'currency', currency: 'USD' })
      .format(price)
      .replace("$","")
      .replace(","," ")
      .replace(".",",") ;

  }
}
