import { QueryEntity } from '@datorama/akita';
import { LoanInformationStore, LoanInformationsState } from './loan-information.store';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoanInformationsQuery extends QueryEntity<LoanInformationsState> {

  constructor(protected override store: LoanInformationStore ) {
    super(store);
  }

}
