

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }      from '@angular/forms';
import { AppComponent }  from './app.component';
import {Repeater} from './repeater.pipe';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, Repeater ],
  bootstrap:    [ AppComponent ]
})
export class AppModule {}