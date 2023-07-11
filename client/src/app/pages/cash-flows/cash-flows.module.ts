import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CashFlowsPageRoutingModule } from './cash-flows-routing.module';

import { CashFlowsPage } from './cash-flows.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CashFlowsPageRoutingModule
  ],
  declarations: [CashFlowsPage]
})
export class CashFlowsPageModule {}
