import { Provider } from '@angular/core';
import { QueryCommand } from './query-command';
import { DbService } from './db.service';

/**
 * Multi-instance providers
 *
 * * Register at the Component level to create service instances visible to only that component tree
 * * Register at the NgModule level to share service instances globally
 */
export const dbProviders: Provider[] = [
    DbService,
    QueryCommand
];
