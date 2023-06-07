import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WordleRoutingModule } from './wordle-routing.module';
import { WordleComponent } from './component/wordle.component';

@NgModule({
  declarations: [WordleComponent],
  imports: [CommonModule, WordleRoutingModule],
})
export class WordleModule {}
