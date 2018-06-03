import { AfterContentChecked, Component, OnDestroy, ViewChild } from '@angular/core'
import { NgForm } from '@angular/forms'
import { debounceTime } from "rxjs/operators";
import { Subscription } from "rxjs/index";

@Component({
  selector: 'app-root',
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
    if (!this.form.controls['value']) // not initialized yet
      return

    if (this.sub)
      return

    this.form.controls['value'].valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe(newValue => this.value = <string> newValue)
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }
}
