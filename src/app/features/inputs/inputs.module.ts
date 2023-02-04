import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputsRoutingModule } from './inputs-routing.module';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { InputsWrapperComponent } from './components/inputs-wrapper/inputs-wrapper.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const Components = [InputsWrapperComponent, CheckboxComponent];

const InternalModules = [
  CommonModule,
  InputsRoutingModule,
  ReactiveFormsModule,
  FormsModule,
];

const ExternalModules = [FontAwesomeModule];

const ExportedComponents = [CheckboxComponent];
@NgModule({
  declarations: [...Components],
  imports: [...InternalModules, ...ExternalModules],
  exports: [...ExportedComponents],
})
export class InputsModule {}