import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BoxesGroupComponent } from "./equipment-group/equipment-group.component";
import { StatsComponent } from "./stats/stats.component";
import { CharacterBoxComponent } from "./character-group/character-box/character-box.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, BoxesGroupComponent, StatsComponent, CharacterBoxComponent], 
  template: `
    <div class="app-container">
      <app-character-box (characterSelected)="onClassSelected($event)"></app-character-box>
      <app-stats [calculationResult]="calculationResult"></app-stats> 
      <app-boxes-group [classSelection]="classSelection" (calculationResultChanged)="onCalculationResultChanged($event)"></app-boxes-group>
      
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
    }
  `]
}) 

export class AppComponent {
  calculationResult: any = null; // Store the calculation result
  classSelection: number = 0; // Store the selected class

  onClassSelected(classId: number) {
    this.classSelection = classId;
  }

  onCalculationResultChanged(result: any) {
    this.calculationResult = result; // Update the calculation result
  }
}