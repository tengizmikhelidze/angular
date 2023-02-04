import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputsWrapperComponent } from './components/inputs-wrapper/inputs-wrapper.component';

const routes: Routes = [
  {
    path: '',
    component: InputsWrapperComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InputsRoutingModule {}
