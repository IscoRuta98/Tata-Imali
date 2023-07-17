import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountsComponent } from './accounts/accounts.component';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [
    AccountsComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    AccountsRoutingModule
  ]
})
export class AccountsModule { }
