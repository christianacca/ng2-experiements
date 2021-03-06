# Ng2Experiements

## Experiments

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

### Routing

* An initial exploration of routing with child and sibling/auxiliary routes
* Also experiment with sticky / MDI routes

**Note** about sticky / MDI routes. As of writing there are following problems that need solving:

* get it to work with sibling/auxiliary routes (see [comment](https://github.com/angular/angular/issues/13869#issuecomment-302315807))
* how to dispose of an detatched component (for example, to ensure that rxjs subscriptions are disposed of)
* whether to allow detatched component to participate in rxjs events
* how to *reload* an page without detaching/attaching current state of page (eg when search term is changed)

**Code listing**: 

* `routing-egs`
* `debug-route-reuse-strategy`
* `route-reuse-always-strategy`


### Dependency registration

* How to create a maintainable application structure that supports injecting groups of service *instances* either at the component level or globally

**Code listing**

* `di-reg`
    * idomatic angular solution
* `di-reg2`
    * alternative solution that uses custom injector

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
