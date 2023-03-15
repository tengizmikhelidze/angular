import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QrCodeGeneratorComponent } from './qr-code-generator.component';

const routes: Routes = [
  {
    path: '',
    component: QrCodeGeneratorComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'wifi',
      },
      {
        path: 'wifi',
        loadChildren: () =>
          import('./wifi-qr/wifi-qr.module').then((m) => m.WifiQrModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrCodeGeneratorRoutingModule {}
