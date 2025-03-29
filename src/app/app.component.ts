import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BoxesGroupComponent } from "./equipment-group/equipment-group.component";
import { StatsComponent } from "./stats/stats.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, BoxesGroupComponent, StatsComponent,], 
  template: `
    <app-boxes-group (calculationResultChanged)="onCalculationResultChanged($event)"></app-boxes-group>
    <app-stats [calculationResult]="calculationResult"></app-stats>
  `,
}) 

export class AppComponent {
  calculationResult: any = null; // Store the calculation result

  onCalculationResultChanged(result: any) {
    this.calculationResult = result; // Update the calculation result
  }
}