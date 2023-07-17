import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig, createEntityStore } from '@datorama/akita';
import { LoanInformation } from './loan-information.model';

export interface LoanInformationsState extends EntityState<LoanInformation> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({
  name: 'digital-rights'
})
export class LoanInformationStore extends EntityStore<LoanInformationsState> {

  constructor() {
    super();
  }

}
