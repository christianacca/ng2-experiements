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
import { ZonesComponent } from './zones/zones.component';
import { ThrowingChildComponent } from './zones/throwing-child/throwing-child.component';
import { FormHybridComplexComponent } from './form-hybrid-complex/form-hybrid-complex.component';

@NgModule({
  declarations: [
    AppComponent,
    FormEgComponent,
    FormHybridComponent,
    ZonesComponent,
    ThrowingChildComponent,
    FormHybridComplexComponent
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
