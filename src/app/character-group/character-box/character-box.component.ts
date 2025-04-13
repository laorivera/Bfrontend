import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-character-box',
  standalone: true, 
  imports: [CommonModule],
  templateUrl: './character-box.component.html',
  styleUrl: './character-box.component.css'
})

export class CharacterBoxComponent {

  @Output() characterSelected = new EventEmitter<number>(); 

  // List of character classes
  characterClasses: string[] = [ 'No selection',
    'Fighter', 'Barbarian', 'Rogue', 'Wizard', 'Cleric', 
    'Warlock', 'Bard', 'Druid', 'Ranger', 'Sorcerer'
  ];

  //selected character's image
  selectedCharacterImage: string = '';

  onChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectCharacter(+target.value); // Convert string to number
  }

  // Method to toggle or change the selected character
  selectCharacter(index: number) {
    console.log('Character selected:', index); // debug
    this.selectedCharacterImage = `assets/${index}.png`;
    this.characterSelected.emit(index);
  }

}