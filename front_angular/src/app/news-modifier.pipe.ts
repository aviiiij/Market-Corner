import { Pipe, PipeTransform } from '@angular/core';
import { news } from './structures';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({name: 'newsModifier'})
export class NewsModifierPipe implements PipeTransform {
    transform(value: news[]): news[][] {
        console.log('inside pipe',value);
        let values: news[][] = [];
        let ind=0;
        for (var pointer in value) {
            if (ind==0) {
                values.push([]);
            }
            values[values.length-1].push(value[pointer]);
            ind+=1;
            if (ind==2) {
                ind=0;
            }
        }
        console.log(values)
        return values
    
    }
}