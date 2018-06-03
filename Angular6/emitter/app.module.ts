

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import { DetailsComponent } from './details.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent, DetailsComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule {}