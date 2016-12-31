/*
 * Example of defining a constructor, where the *constructor* itself that can be 
 * injected as a service.
 * 
 * See also asset.ts for an alternative (worse) implementation
 * 
 * See also report.model.ts for an alternative *design* where instances
 * of the constructor depends on services provided by the injector
 * but where the *constructor* is loaded as a regualr ES2015 module
 * and is NOT injected as a service.
 * 
 * Why? 
 * This is useful when your program wants a plain constructor to create
 * instances but those instances must rely on service created by the
 * angular injector
 */

import { OpaqueToken } from '@angular/core';
import { Db } from './db.service';

export interface CompanyType {
  new(): Company;
}
export const CompanyType = new OpaqueToken('CompanyType');

export class Company {
  id?: number;
  legalName?: string;
  constructor() { }
  load() {
    Company.db.fetchEntityData<Company>(this.id, 'Company').then(data => {
      this.legalName = data.legalName || 'RAM';
    });
  }

  private static db: Db;
  static init(db: Db) {
    Company.db = db;
    return Company;
  }
}

export const COMPANY_TYPE_PROVIDER = {
  provide: CompanyType,
  useFactory: Company.init,
  deps: [Db]
};