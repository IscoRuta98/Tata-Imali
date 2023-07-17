import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountsComponent } from './accounts/accounts.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AccountsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AccountsRoutingModule
  ]
})
export class AccountsModule { }
