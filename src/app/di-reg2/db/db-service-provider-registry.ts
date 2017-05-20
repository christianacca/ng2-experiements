import { Provider, ReflectiveInjector, InjectionToken, ResolvedReflectiveProvider, Injectable } from '@angular/core';

export const DB_SERVICE = new InjectionToken<Array<Provider>>('Db service provider');

@Injectable()
export class DbServiceProviderRegistry {
    resolvedProviders: ResolvedReflectiveProvider[];
    private providers: Provider[] = [];

    register(providers: Provider[]) {
        // CRITICAL: order of providers
        // Incoming `providers` must NOT overwrite existing `this.providers`
        // This is to avoid problem of services from **lazy-loaded** modules replacing existing providers
        this.providers = [providers, ...this.providers];
        this.resolvedProviders = null;
    }

    getProviders() {
        return this.resolvedProviders = (this.resolvedProviders || ReflectiveInjector.resolve(this.providers));
    }
}
