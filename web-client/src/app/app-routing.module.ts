import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./session/session.module').then(m => m.SessionModule)
  },
  {
    path: 'session',
    loadChildren: () =>
      import('./session/session.module').then(m => m.SessionModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
