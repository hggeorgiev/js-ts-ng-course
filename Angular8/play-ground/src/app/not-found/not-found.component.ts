

import { Component } from '@angular/core'

@Component({
    selector: 'not-found',
    template: `
        <h1>Oops, something went wrong!</h1>
        <div class='about'>
            We can't find the page you're looking for.
        </div>
    `
})
export class NotFoundComponent {}