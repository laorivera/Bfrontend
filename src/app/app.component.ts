import { Component } from '@angular/core';
import { CharacterBoxComponent } from './character-box/character-box.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CharacterBoxComponent],
  template: `
  <h1>Character Builder</h1>
  <app-character-box></app-character-box>
  `,
})

export class AppComponent {}