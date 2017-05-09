# Ng2Experiements

## Experiments

### async service bootstrap

* You want to provide the convenience of working with a service by making *synchronous* calls to it's methods.
* Yet the service requires some async data before it can work
* The service should load its data before injecting the service into a component or a route guard

This experiment shows how a service can define an async method that is guaranteed to have completed
before the service is injected into a component or a route guard.

Such a service becomes a `bootstrappable` service

**Limitations**

* **WARNING**: There is no guarantees that a `bootstrappable` service will be finished bootrapping when injecting that service into another service
* A `bootstrappable` service must be registered with the root injector
    * The solution relies on the `APP_INITIALIZER` token to register the `bootstrappable` service. Services thus registered will only be invoked during the bootstrapping of the *application*
    * Therefore, registering a `bootstrappable` service in a lazy loaded module or a component will not result in the bootstrapping of the `bootstrappable`

**Code listing**

* Implementation: `provide-bootstrappable.ts`, `bootstrappable.ts`
* Example usage: `bootstrappable.service.ts`, `bootstrappable2.service.ts`


### synchronous module initialization

* You want to run code once for a module (equivalent to a run block in AngularJS)
* This code needs to be run before any other component or route resolve runs within that module

This experiment shows how one or more factory functions or services can be registered with the angular DI system. These registered factory functions or services
will be invoked immediately before the module that registed them is instantiated.

For modules defined within non-lazy loaded routes, this means immediately after bootstrap of the application.
For modules defined within lazy loaded routes, this means immediately after navigating to a path within the lazy route.

**Code listing**

* Implementation: `module-sync-init`
* Example usage:
    * `app.module`, `forms.module`: see `ModuleSyncInitModule.withInits([logModInitProvider])`
    * `report.module`: see `ModuleSyncInitModule.withInits([logModInitProvider, reportCtorInitProvider])`


### async module initialization

* You want to run *async* code once for a module
* This code needs to be run before any other component or route resolve runs within that module

This experiment shows how to register an angular service that implements an `IRunnable` interface. These registered services are guaranteed to run before the 
components or route resolve in the module that registered them.

How the solution is used will depend on whether the module is lazy loaded or not - see the code listing for examples

**IMPORTANT**: A note on ordering of execution

* a service registered in a *non-lazy* loaded route (eg app.module) will run *before* a synchronous module init service / factory also registered in that route
* a service registered in a *lazy* loaded route (eg admin.module) will run *after* a synchronous module init service / factory also registered in that route

TODO: change synchronous module init to always run before async module init

**Code listing**

* non-lazy module: `app.module`, `runnable-egs`
* lazy module: `admin.module`, `admin-routing.module` `admin/runnable-egs`
    * take note of the use of `LazyModuleRunner` in `admin-routing.module`


### injecting services into a `class`

* You want to a regular class to create instances from
* That class requires a service provided by the angular injector

This experiment shows various solutions.

**Code listing**

* `asset.ts` (worst solution)
* `company.ts` (better solution)
* `report.model.ts` (best solution)


### Reactive forms

* Basic Example (todo: extend as necessary)
* Usefully shows that with the reactive form, angular will still add field state and validation css classes to the html elements

**See also**

* custom control: https://plnkr.co/edit/msnDv0aCAWu8gxShb9wC

**Code listing**: `form-eg`


### Hybrid reactive forms

* Basic Example (todo: extend as necessary)
* Shows how you can mix reactive code idoms with template-driven forms

**Code listing**: `form-hybrid`


### Zones

* An initial exploration of what practical uses there are in using zone's in our code

**Code listing**: `zones`

----

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.30.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Deploying to GitHub Pages

Run `ng github-pages:deploy` to deploy to GitHub Pages.

## Further help

To get more help on the `angular-cli` use `ng help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
