import { NgModule, ModuleWithProviders, Optional, Inject, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DbServiceProviderRegistry, DB_SERVICE } from './db-service-provider-registry';
import { QueryCommand } from './query-command';
import { UowService } from './uow.service';
import { DataCacheService } from './data-cache.service';

@NgModule({
  providers: [
    DbServiceProviderRegistry,
    DataCacheService,
    { provide: DB_SERVICE, multi: true, useValue: QueryCommand },
    UowService
  ]
})
export class DbModule {
  constructor(@Optional() @Inject(DB_SERVICE) dbServices: Provider[], registry: DbServiceProviderRegistry) {
    if (dbServices != null) {
      registry.register(dbServices);
    }
  }
}
