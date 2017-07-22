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

import { Db } from './db.service';

export interface CompanyType {
  new (): Company;
}

/**
 * The injection token for the {@link Company} constructor
 */
export class CompanyType {

}

export class Company {
  private static db: Db;
  id?: number;
  legalName?: string;

  static init(db: Db) {
    Company.db = db;
    return Company;
  }

  constructor() { }
  load() {
    Company.db.fetchEntityData<Company>(this.id, 'Company').then(data => {
      this.legalName = data.legalName || 'RAM';
    });
  }

}

export function initCtor(db: Db) {
  return Company.init(db);
}

export const COMPANY_TYPE_PROVIDER = {
  provide: CompanyType,
  useFactory: initCtor,
  deps: [Db]
};
