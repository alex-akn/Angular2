import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'slash' })
/** Adds '/' if the input string isn't empty */
export class SlashPipe implements PipeTransform {
  transform(phrase: string) {
    return phrase ? phrase + '/' : '';
  }
}