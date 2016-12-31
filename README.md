# ng2-experiments

## Experiments

### async service bootstrap

* You want to provide the convenience of working with a service by making *synchronous* calls to it's methods.
* Yet the service requires some async data before it can work
* The service should load its data before injecting the service into a component or a route guard

This experiment shows how a service can define a an async method that is guaranteed to have completed
before the service is injected into a component or a route guard.

Such a service becomes a `bootstrappable` service

**WARNING**: There is no guarantees that a `bootstrappable` service will be finished bootrapping when
injecting that service into another service.

**Code listing**

* Implementation: `provide-bootstrappable.ts`, `bootstrappable.ts`
* Example usage: `bootstrappable.service.ts`, `bootstrappable2.service.ts`, `index.ts`

### injecting services into a `class`

* You want to a regular class to create instances from
* That class requires a service provided by the angular injector

This experiment shows various solutions.

**Code listing**

* `asset.ts` (worst solution)
* `company.ts` (better solution)
* `report.model.ts` (best solution)

----

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.15.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/). 
Before running the tests make sure you are serving the app via `ng serve`.

## Deploying to Github Pages

Run `ng github-pages:deploy` to deploy to Github Pages.

## Further help

To get more help on the `angular-cli` use `ng --help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

---