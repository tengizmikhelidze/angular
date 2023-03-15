import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QrCodeGeneratorRoutingModule } from './qr-code-generator-routing.module';
import { QrCodeGeneratorComponent } from './qr-code-generator.component';

@NgModule({
  declarations: [QrCodeGeneratorComponent],
  imports: [CommonModule, QrCodeGeneratorRoutingModule],
})
export class QrCodeGeneratorModule {}
