import { ENVIRONMENT_INITIALIZER, NgModule, NgZone, inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountsModule } from './accounts/accounts.module';
import { akitaDevtools, DevtoolsOptions } from '@datorama/akita';

export function provideAkitaDevtools(options: Partial<DevtoolsOptions> = {}) {
  return {
    provide: ENVIRONMENT_INITIALIZER,
    multi: true,
    useFactory() {
      return () => {
        akitaDevtools(inject(NgZone), options);
      };
    }
  };
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AccountsModule,
    AppRoutingModule
  ],
  providers: [
    provideAkitaDevtools({
      name: 'Tata-Imali'
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
