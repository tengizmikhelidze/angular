import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'inputs',
      },
      {
        path: 'calendar',
        loadChildren: () =>
          import('./calendar/calendar.module').then((m) => m.CalendarModule),
      },
      {
        path: 'inputs',
        loadChildren: () =>
          import('./inputs/inputs.module').then((m) => m.InputsModule),
      },
      {
        path: 'QR',
        loadChildren: () =>
          import('./qr-code-generator/qr-code-generator.module').then(
            (m) => m.QrCodeGeneratorModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturesRoutingModule {}
