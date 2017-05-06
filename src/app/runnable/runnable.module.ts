import { NgModule, Provider, APP_INITIALIZER, ModuleWithProviders } from '@angular/core';
import { RUNNABLE, IRunnable, Runner, runAll } from './runner';
import { LazyModuleRunner } from './lazy-module-runner';

const nullRunnablesProvider: Provider = {
    provide: RUNNABLE,
    multi: true,
    useValue: null
};

const runAllProvider = {
    provide: APP_INITIALIZER,
    multi: true,
    useFactory: runAll,
    deps: [RUNNABLE, Runner]
};



@NgModule({})
export class RunnableModule {
    static forRoot(...runnableProviders: Provider[]): ModuleWithProviders {
        return {
            ngModule: RunnableModule,
            providers: [
                Runner,
                nullRunnablesProvider,
                runAllProvider,
                runnableProviders
            ]
        };
    }

    static forLazyModule(...runnableProviders: Provider[]): ModuleWithProviders {
        return {
            ngModule: RunnableModule,
            providers: [
                LazyModuleRunner,
                runnableProviders
            ]
        };
    }
}
