<<<<<<< HEAD
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BoxesGroupComponent } from "./equipment-group/equipment-group.component";
import { StatsComponent } from "./stats/stats.component";
=======

import { Component, ViewChild } from '@angular/core';
import { CalculationResult } from './app.datafetch'; 
import { HttpClient } from '@angular/common/http';
import { HeadBoxComponent } from './head-box/head-box.component';
import { ChestBoxComponent } from './chest-box/chest-box.component'; 
import { GlovesBoxComponent } from './gloves-box/gloves-box.component';
import { CommonModule } from '@angular/common';
// Updated import path
>>>>>>> f31a904e676bcd9a1b57b526fb166053b0b724b2

@Component({
  selector: 'app-root',
  standalone: true,
<<<<<<< HEAD
  imports: [CommonModule, BoxesGroupComponent, StatsComponent,], 
  template: `
    <app-boxes-group (calculationResultChanged)="onCalculationResultChanged($event)"></app-boxes-group>
    <app-stats [calculationResult]="calculationResult"></app-stats>
=======
  imports: [ HeadBoxComponent, ChestBoxComponent, GlovesBoxComponent, CommonModule ], // Already correct, no change needed here
  template: `
    <h1> . </h1> <!-- Updated title to be more generic -->

    <app-head-box #headBox (itemSelected)="onItemSelected('itemhelmet', $event)"></app-head-box>
    <app-chest-box></app-chest-box>
    <app-gloves-box></app-gloves-box> 

    <h3 STATS > <!-- Updated title to be more generic -->
    <div *ngIf="calculationResult">
      <h2>Stats</h2>
      
      <p>Strength: {{ calculationResult.stats.Strength }}</p>
      <p>Vigor: {{ calculationResult.stats.Vigor }}</p>
      <p>Agility: {{ calculationResult.stats.Agility }}</p>
      <p>Dexterity: {{ calculationResult.stats.Dexterity }}</p>
      <p>Will: {{ calculationResult.stats.Will }}</p>
      <p>Knowledge: {{ calculationResult.stats.Knowledge }}</p>
      <p>Resourcefulness: {{ calculationResult.stats.Resourcefulness }}</p>

      <h2>Computed Stats</h2>

      <p>Health: {{ calculationResult.computedstats.Health }}</p>
      <p>Move Speed: {{ calculationResult.computedstats.MoveSpeed }}</p>
      <p>Physical Power: {{ calculationResult.computedstats.PhysicalPower }}</p>
      <p>Magical Power: {{ calculationResult.computedstats.MagicalPower }}</p>
      <p>Physical Damage Reduction: {{ calculationResult.computedstats.PhysicalDamageReduction }}</p>  
>>>>>>> f31a904e676bcd9a1b57b526fb166053b0b724b2
  `,
}) 

export class AppComponent {
<<<<<<< HEAD
  calculationResult: any = null; // Store the calculation result

  onCalculationResultChanged(result: any) {
    this.calculationResult = result; // Update the calculation result
  }
=======

  @ViewChild('headBox') headBox!: HeadBoxComponent;
  
  selectedItems: { [key: string]: string } = {}; // Store selected item names by slot
  calculationResult: any = null; // Store the calculation result

  constructor(private http: HttpClient) {}

  onItemSelected(slot: string, itemName: string) {
    this.selectedItems[slot] = itemName; // Update the selected item for this slot
    this.calculateEquipment(); // Trigger calculation with all selected items
  }

  calculateEquipment() {
    // Construct query string from selected items
    const params = new URLSearchParams();
    for (const [slot, name] of Object.entries(this.selectedItems)) {
      if (name) { // Only include slots with a selected item
        params.append(slot, name);
      }
    }
    const url = `http://127.0.0.1:8080/charbuilder/1?${params.toString()}`;

    // Make GET request
    this.http.get<any>(url).subscribe({
      next: (response) => {
        this.calculationResult = response; // Store and display the result
        //console.log('Calculation result:', response);
      },
      error: (err) => {
        console.error('Error calculating equipment:', err);
        this.calculationResult = null;
      },
    });
  }
  
>>>>>>> f31a904e676bcd9a1b57b526fb166053b0b724b2
}