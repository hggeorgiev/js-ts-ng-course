import {HighlightDirective} from './highlight.directive';
import {Component, Input} from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
        <h1>My First Attribute Directive</h1>
        <h4>Pick a highlight color</h4>

        <div>
            <input type="radio" name="colors" (click)="color='lightgreen'">Green
            <input type="radio" name="colors" (click)="color='yellow'">Yellow
            <input type="radio" name="colors" (click)="color='cyan'">Cyan
        </div>
        
        <p [myHighlight]="color">Highlight me!</p>
    `
})
export class AppComponent {
    color: string
}
