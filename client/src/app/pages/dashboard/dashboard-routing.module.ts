import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    children: [
      {
        path: 'accounts',
        children:[
          {
          path: '',
          loadChildren: () => import('src/app/pages/accounts/accounts.module').then( m => m.AccountsPageModule)
        }
        ]
      },
      {
        path: 'cash-flows',
        children:[
          {
          path: '',
          loadChildren: () => import('src/app/pages/cash-flows/cash-flows.module').then( m => m.CashFlowsPageModule)
        }
        ]
      },
      {
        path: 'loans',
        children:[
          {
          path: '',
          loadChildren: () => import('src/app/pages/loans/loans.module').then( m => m.LoansPageModule)
        }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
