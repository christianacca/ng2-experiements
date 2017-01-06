import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AdminModule } from './admin/admin.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared';
import { AppRoutingModule } from './app-routes';
import { ReportsModule } from './reports/reports.module';
import { FormEgComponent } from './form-eg/form-eg.component';
import { FormHybridComponent } from './form-hybrid/form-hybrid.component';

@NgModule({
  declarations: [
    AppComponent,
    FormEgComponent,
    FormHybridComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AdminModule,
    ReportsModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
