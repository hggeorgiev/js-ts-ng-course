import {Component} from '@angular/core'

@Component({
    selector: 'about',
    template: `
        <div>This is about page of our app</div>
    `,
    styles: ['div { width: 300px; background: #ddd; margin: 30px; padding: 50px; font-size: 18px; }']
})
export class AboutComponent {}