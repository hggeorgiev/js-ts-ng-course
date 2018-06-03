import { Directive, ElementRef, Input, Renderer2, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'
@Directive({
    selector: '[myHighlight]',
    host: {
        '(mouseenter)': 'onMouseEnter()',
        '(mouseleave)': 'onMouseLeave()'
    }
})
export class HighlightDirective {
    @Input('myHighlight')
    highlightColor: string;
    
    _el: HTMLElement;
    
    constructor(
        el: ElementRef, 
        private renderer: Renderer2,
        private sanitizer: DomSanitizer
    ) {
      // el.nativeElement.style.backgroundColor = 'yellow';
      this._el = el.nativeElement;
    }
    
    onMouseEnter() { this._highlight(this.highlightColor); }
    onMouseLeave() { this._highlight(null); }

    private _highlight(color: string) {
        this.renderer.setProperty( this._el.style, 'backgroundColor', color)
        // XSS security issue example
        let val = "<script>console.log('XSS injection')</script>"
        // val = this.sanitizer.sanitize(SecurityContext.HTML, val)
        // this.renderer.setProperty( this._el, 'innerHTML', val)
        this._el.innerHTML = val
    }
}
