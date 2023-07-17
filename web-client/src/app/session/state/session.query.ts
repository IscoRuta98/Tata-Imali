import { Query } from '@datorama/akita';
import { SessionState, SessionStore } from './session.store';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SessionQuery extends Query<SessionState> {
  userName = this.select(state => state.userInfo?.userName);

  constructor(protected sessionStore: SessionStore) {
    super(sessionStore);
  }
}
