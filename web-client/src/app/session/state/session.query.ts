import { Query, createQuery } from '@datorama/akita';
import { SessionState, SessionStore } from './session.store';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SessionQuery extends Query<SessionState> {

  constructor(protected sessionStore: SessionStore) {
    super(sessionStore);
  }
}
