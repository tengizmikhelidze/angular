import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WifiQrComponent } from './wifi-qr.component';

const routes: Routes = [
  {
    path: '',
    component: WifiQrComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WifiQrRoutingModule {}
