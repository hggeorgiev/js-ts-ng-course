import { Component, AfterContentChecked, OnDestroy, ViewChild } from '@angular/core'
import { FormControl, NgForm } from '@angular/forms'
import { Subscription } from 'rxjs/Subscription'
import 'rxjs/add/operator/debounceTime'

@Component({
    selector: 'my-app',
    template: `
        <form #form="ngForm">
            <input type=text name="value" [ngModel]="value"><br/>
            Typed: {{value}}
        </form>
    `
})
export class AppComponent implements AfterContentChecked, OnDestroy {
    value = ''
    sub: Subscription

    @ViewChild('form') form: NgForm

    ngAfterContentChecked() {
        if( ! this.form.controls['value'] ) // not initialized yet
            return

        if( this.sub )
            return

        this.form.controls['value'].valueChanges
             .debounceTime(1000)
             .subscribe(newValue => this.value = <string> newValue)
    }

    ngOnDestroy() {
        this.sub.unsubscribe()
    }
 }
