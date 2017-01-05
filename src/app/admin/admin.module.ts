import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component';
import { FeatOneComponent } from './feat-one/feat-one.component';
import { AdminRoutingModule } from './admin-routing.module';

// function declaration used because of https://github.com/angular/angular/issues/13614
export function adminTitleResolve () {
  return 'Admin Area (injected)';
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule
  ],
  declarations: [AdminComponent, FeatOneComponent],
  providers: [
    // a resolve function that will be used to supply data when when routing to the admin.component
    // IMPORTANT: 
    // this provider will be added to the *root injector* and therefore available for injection
    // throughout app - this is NOT what we want but is inevitable due to the design of DI
    // A naive attempt at limiting the visibility would be to add the provider to the admin.component...
    // ... this wouldn't work as routing uses the root injector which is never configured with providers
    // added to a component, even when that component is the root component of our application
    { provide: 'AdminTitleResolve', useValue: adminTitleResolve }
  ]
})
export class AdminModule { }
