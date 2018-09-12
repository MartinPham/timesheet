import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// import 'hammerjs';
import { MaterialModule } from '@angular/material';
import { CalendarModule } from 'angular-calendar';


import { AppComponent } from './app.component';
import { SecondsToTimePipe } from './secondsToTime.pipe';
import { SameStartedAtPipe } from './sameStartedAt.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SameStartedAtPipe,
    SecondsToTimePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule.forRoot(),
    CalendarModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
