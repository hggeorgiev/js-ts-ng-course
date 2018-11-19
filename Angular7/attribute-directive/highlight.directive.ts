import {Directive, ElementRef, Input} from '@angular/core';
@Directive({
    selector: '[myHighlight]',
    host: {
        '(mouseenter)': 'onMouseEnter()',
        '(mouseleave)': 'onMouseLeave()'
    }
})
export class HighlightDirective {
    @Input('myHighlight')
    highlightColor: string
    
    _el: HTMLElement
    
    constructor(el: ElementRef) {
      // el.nativeElement.style.backgroundColor = 'yellow';
      this._el = el.nativeElement;
    }
    
    onMouseEnter() { this._highlight(this.highlightColor); }
    onMouseLeave() { this._highlight(null); }

    private _highlight(color: string) {
        this._el.style.backgroundColor = color;
    }
}
