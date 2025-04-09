import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, ViewChildren, QueryList } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeadBoxComponent } from './head-box/head-box.component';
import { ChestBoxComponent } from './chest-box/chest-box.component';
import { GlovesBoxComponent } from './gloves-box/gloves-box.component';
import { PantsBoxComponent } from './pants-box/pants-box.component';
import { NecklaceBoxComponent } from './necklace-box/necklace-box.component';
import { CharacterBoxComponent } from './character-box/character-box.component';

@Component({
  selector: 'app-boxes-group',
  standalone: true,
  imports: [
    CommonModule,
    HeadBoxComponent,
    ChestBoxComponent,
    GlovesBoxComponent,
    PantsBoxComponent,
    NecklaceBoxComponent,
    CharacterBoxComponent
  ],
  templateUrl: './equipment-group.component.html',
  styleUrl: './equipment-group.component.css'
})

export class BoxesGroupComponent {

  @Output() calculationResultChanged = new EventEmitter<any>(); 

  @ViewChildren(HeadBoxComponent) headBoxes!: QueryList<HeadBoxComponent>;
  @ViewChildren(ChestBoxComponent) chestBoxes!: QueryList<ChestBoxComponent>;
  @ViewChildren(GlovesBoxComponent) glovesBoxes!: QueryList<GlovesBoxComponent>;
  @ViewChildren(PantsBoxComponent) pantsBoxes!: QueryList<PantsBoxComponent>;
  @ViewChildren(NecklaceBoxComponent) necklaceBoxes!: QueryList<NecklaceBoxComponent>;

  selectedItems:        {[key: string]: string} = {}; 
  selectedRarites:      {[key: string]: string} = {}; 
  selectedRatings:      {[key: string]: string} = {};
  selectedEnchant:      {[key: string]: string} = {};
  selectedEnchantValue: {[key: string]: number} = {}; 
  selectedCharacterIndex: number = 0; 

  constructor(private http: HttpClient) {}

  onCharacterSelected(index: number) {
    //console.log('Character selected in BoxesGroup:', index); // Debug log
    this.selectedCharacterIndex = index;
    this.headBoxes.forEach(component => component.resetSelection());
    this.chestBoxes.forEach(component => component.resetSelection());
    this.glovesBoxes.forEach(component => component.resetSelection());
    this.pantsBoxes.forEach(component => component.resetSelection());
    this.necklaceBoxes.forEach(component => component.resetSelection());
    this.selectedItems = {};
    this.selectedRarites = {}; // reset rarity
    this.selectedRatings = {}; // reset rating
    this.selectedEnchant = {}; // reset enchantment
    this.selectedEnchantValue = {}; // reset enchantment value
    this.calculateCharacter(); // funcion calcula character base
  }

  onItemSelected_Helmet(slot: string, itemName: string) {
    if (this.selectedRarites['rarityselect_helmet']){
      this.selectedRarites['rarityselect_helmet'] = this.selectedRarites[''] = ""
      }
    if (this.selectedRatings['armorrating_helmet']){
      this.selectedRatings['armorrating_helmet'] = this.selectedRatings['']
    }
    if (this.selectedEnchant['enchantment_helmettype']) {
      this.selectedEnchant['enchantment_helmettype'] = ""; // Reset enchantment value if it exists
    }
    
    if (this.selectedEnchantValue['enchantment_helmetvalue']) {
      this.selectedEnchantValue['enchantment_helmetvalue'] = 0; // Reset enchantment value if it exists\
    }

    this.selectedItems[slot] = itemName;
    this.calculateEquipment(); 
  }

  onItemSelected_Chest(slot: string, itemName: string) {
    if (this.selectedRarites['rarityselect_chest']){
      this.selectedRarites['rarityselect_chest'] = this.selectedRarites[''] = "";
      }
    if (this.selectedRatings['armorrating_chest']){
      this.selectedRatings['armorrating_chest'] = this.selectedRatings['']
    }
    this.selectedItems[slot] = itemName;
    this.calculateEquipment(); 
  }

  onItemSelected_Gloves(slot: string, itemName: string) {
    if (this.selectedRarites['rarityselect_gloves']){
      this.selectedRarites['rarityselect_gloves'] = this.selectedRarites[''] = "";
      }
    if (this.selectedRatings['armorrating_gloves']){
      this.selectedRatings['armorrating_gloves'] = this.selectedRatings['']
    }
    this.selectedItems[slot] = itemName;
    this.calculateEquipment(); 
  }

  onItemSelected_Pants(slot: string, itemName: string) {
    if (this.selectedRarites['rarityselect_pants']){
      this.selectedRarites['rarityselect_pants'] = this.selectedRarites[''] = "";
      }
    if (this.selectedRatings['armorrating_pants']){
      this.selectedRatings['armorrating_pants'] = this.selectedRatings['']
    }
    this.selectedItems[slot] = itemName;
    this.calculateEquipment(); 
  }

  onItemSelected_Necklace(slot: string, itemName: string) {
    if (this.selectedRarites['rarityselect_necklace']){
      this.selectedRarites['rarityselect_necklace'] = this.selectedRarites[''] = "";
      }
    if (this.selectedRatings['armorrating_necklace']){
      this.selectedRatings['armorrating_necklace'] = this.selectedRatings['']
    }
    this.selectedItems[slot] = itemName;
    this.calculateEquipment(); 
  }

  onRaritySelected(slot: string, rarity: number){ 
    this.selectedRarites[slot] = String(rarity);
    const slotType = slot.split('_')[1]; 
    const ratingKey = `armorrating_${slotType}`;
    
    const enchantmentType = `enchantment_${slotType}type`;
    const enchantmentValue = `enchantment_${slotType}value`;

    const enchantmentTypeRare = `enchantment_${slotType}type2`;
    const enchantmentValueRare = `enchantment_${slotType}value2`;

    if (this.selectedEnchant[enchantmentType]) {
      this.selectedEnchant[enchantmentType] = ""; // Reset enchantment value if it exists
    }
    if (this.selectedEnchantValue[enchantmentValue]) {
      this.selectedEnchantValue[enchantmentValue] = 0; // Reset enchantment value if it exists\
    }
    if (this.selectedEnchant[enchantmentTypeRare]) {
      this.selectedEnchant[enchantmentTypeRare] = ""; // Reset enchantment value if it exists
    }
    if (this.selectedEnchantValue[enchantmentValueRare]) {
      this.selectedEnchantValue[enchantmentValueRare] = 0; // Reset enchantment value if it exists\
    }

    if (this.selectedRatings[ratingKey]) {
        delete this.selectedRatings[ratingKey];
    }
    this.calculateEquipment();
  }

  onRatingSelected(slot: string, rating: number){
    this.selectedRatings[slot] = String(rating);
    //console.log(this.selectedRatings)
    this.calculateEquipment();
  }

  onEnchantmentSelected_TypeUncommon( slot: string, enchantment: string) {
    this.selectedEnchant[slot] = enchantment;
    if (this.selectedEnchantValue['enchantment_helmetvalue'] >= 0) {
      this.selectedEnchantValue['enchantment_helmetvalue'] = 0;
      
    }
    this.calculateEquipment();
  }

  onEnchantmentSelected_ValueUncommon(slot: string, enchantmentValue: number) {
    this.selectedEnchantValue[slot] = enchantmentValue;
    this.calculateEquipment();
  }

  onEnchantmentSelected_TypeRare(slot: string, enchantment: string) {
    
    if (this.selectedEnchantValue['enchantment_helmetvalue2'] >= 0) {
      this.selectedEnchantValue['enchantment_helmetvalue2'] = 0;
    }
    this.selectedEnchant[slot] = enchantment;

    //this.selectedEnchantValue['enchantment_helmetvalue'] = 0;
    this.calculateEquipment();
  }

  onEnchantmentSelected_ValueRare(slot: string, enchantmentValue: number) {
    this.selectedEnchantValue[slot] = enchantmentValue;
    this.calculateEquipment();
  }
  // API CALL TO CALCULATE EQUIPMENT
  calculateEquipment() {
    // Construct query string from selected items
    const params = new URLSearchParams();
  
      for (const [slot, name] of Object.entries(this.selectedItems)) {
        if (name) params.append( slot, name);
        }
      for (const [slot, rarity] of Object.entries(this.selectedRarites)) {
        if (rarity) params.append(slot, rarity);
      }
      for (const [slot, rating] of Object.entries(this.selectedRatings)) {
        if (rating) params.append( slot, rating);
      }
      for (const [slot, enchantment] of Object.entries(this.selectedEnchant)) {
        if (enchantment) params.append( slot, enchantment);
      }
      for (const [slot, enchantmentValue] of Object.entries(this.selectedEnchantValue)) {
        if (enchantmentValue) params.append( slot, String(enchantmentValue));
      } 

      
    const url = `http://127.0.0.1:8080/charbuilder/${this.selectedCharacterIndex}?${params.toString()}`;
   
    this.http.get<any>(url).subscribe({
      next: (response) => {
        this.calculationResultChanged.emit(response); // Emit the result to the parent
      },
      error: (err) => {
        console.error('Error calculating equipment:', err);
        this.calculationResultChanged.emit(null); // Emit null in case of error
      },
    });
  }
  // API call to calculate character
  calculateCharacter() {
    const url = `http://127.0.0.1:8080/charbuilder/${this.selectedCharacterIndex}`;
    
    this.http.get<any>(url).subscribe({
      next: (response) => {
        this.calculationResultChanged.emit(response); // Emit the result to the parent
      },
      error: (err) => {
        console.error('Error calculating equipment:', err);
        this.calculationResultChanged.emit(null); // Emit null in case of error
      },
    });
  }
}