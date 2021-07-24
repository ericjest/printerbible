import { Pipe, PipeTransform } from '@angular/core';
/*
 * Generates an array with the length of a non-negative integer. Used to iterate x number times in an ngFor.
 * Usage:
 *   let key of 5 | iterateNumber
 * Example:
 *   <span *ngFor="let key of 5 | iterateNumber">{{ key }}</span>
 *   formats to:
 *   <span>1</span>
 *   <span>2</span>
 *   <span>3</span>
 *   <span>4</span>
 *   <span>5</span>
*/
@Pipe({ name: 'iterateNumber' })
export class IterateNumberPipe implements PipeTransform {
    transform(num: number): number[] {
        let iterationArray = [];
        for (let i = 1; i <= num; i++) {
            iterationArray.push(i);
        }
        return iterationArray;
    }
}