import { Component } from '@angular/core';
import { HeadBoxComponent } from './head-box/head-box.component';
import { ChestBoxComponent } from './chest-box/chest-box.component'; 
import { GlovesBoxComponent } from './gloves-box/gloves-box.component';// Updated import path

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ HeadBoxComponent, ChestBoxComponent, GlovesBoxComponent ], // Already correct, no change needed here
  template: `
    <h1> ----> </h1> <!-- Updated title to be more generic -->

    <app-head-box></app-head-box> 
    <app-chest-box></app-chest-box>
    <app-gloves-box></app-gloves-box> 
  `,
})
export class AppComponent {}