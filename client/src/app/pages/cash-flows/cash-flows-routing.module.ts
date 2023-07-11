import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CashFlowsPage } from './cash-flows.page';

const routes: Routes = [
  {
    path: '',
    component: CashFlowsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CashFlowsPageRoutingModule {}
