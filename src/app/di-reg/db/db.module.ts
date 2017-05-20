import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataCacheService } from './data-cache.service';

@NgModule({
  providers: [DataCacheService]
})
export class DbModule {}
