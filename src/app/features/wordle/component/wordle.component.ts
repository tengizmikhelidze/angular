import { Component } from '@angular/core';

@Component({
  selector: 'app-component',
  templateUrl: './wordle.component.html',
  styleUrls: ['./wordle.component.scss'],
})
export class WordleComponent {
  NUMBER_OF_GUESSES: number = 6;

  arrayFromNumber(number: number = this.NUMBER_OF_GUESSES): any[] {
    return new Array(number);
  }
}
