import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { UserInformation } from 'src/app/schema/entities';

export interface SessionState {
  userInfo?: UserInformation;
  password?: string;
}

export function createInitialState(): SessionState {
  return {
    userInfo: undefined,
    password: undefined
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'session', resettable: true })
export class SessionStore extends Store<SessionState> {
  constructor() {
    super(createInitialState());
  }
}
