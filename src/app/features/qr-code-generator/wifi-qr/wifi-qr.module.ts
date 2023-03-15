import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WifiQrRoutingModule } from './wifi-qr-routing.module';
import { WifiQrComponent } from './wifi-qr.component';
import { InputsModule } from '../../inputs/inputs.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [WifiQrComponent],
  imports: [CommonModule, WifiQrRoutingModule, InputsModule, FormsModule],
})
export class WifiQrModule {}
