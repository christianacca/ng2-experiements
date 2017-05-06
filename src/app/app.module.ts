import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { SharedModule } from './shared';
import { RunnableModule, RUNNABLE } from './runnable';
import { RunnableEgService } from './runnable-eg.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    SharedModule.forRoot(),
    AppRoutingModule,
    RunnableModule.forRoot([
      { provide: RUNNABLE, multi: true, useClass: RunnableEgService }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
