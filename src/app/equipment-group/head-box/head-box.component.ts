import { Component, EventEmitter, Input, Output, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ListItem {
  name: string;
  image: string;
}

@Component({
  selector: 'head-box',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './head-box.component.html',
  styleUrl: './head-box.component.css'
})
export class HeadBoxComponent {
  //store values
  private _classSelection: number = 0;
  showList = false;
  i: number = 0; // counter
  selectedItem: ListItem | null = null;
  selectedRarity: number = 0;
  selectedRating: number = 0;
  //selectedEnchantments['uncommon'].type);: string = "";
  //selectedEnchantments['uncommon'].value: number = 0;
  //selectedEnchantment_Rare: string = "";
 // selectedEnchantValue_Rare: number = 0;
  selectedEnchantments: { [rarity: string]: { type: string, value: number } } = {
      uncommon: { type: '', value: 0 },
      rare: { type: '', value: 0 },
      epic: { type: '', value: 0 },
      legendary: { type: '', value: 0 },
      unique: { type: '', value: 0 }
  };

  enchantmentLists: { [rarity: string]: { types: string[], values: number[] } } = {
    uncommon: { types: [], values: [] },
    rare: { types: [], values: [] },
    epic: { types: [], values: [] },
    legendary: { types: [], values: [] },
    unique: { types: [], values: [] }
  };

  listCharacters: ListItem[] = [];
  listRating: number[] = [];
  //listEnchantment_TypeUncommon: string[] = [];
  //enchantmentLists['uncommon'].types);: number[] = [];
  //listEnchantment_TypeRare: string[] = [];
  //listEnchantment_ValueRare: number[] = [];
  showContextMenu = false;
  selectedRatingIndex: number = 0;


  //array rarity 
  rarityHead: string[] = ["No selection", "Poor", "Common", "Uncommon", "Rare", "Epic", "Legendary", "Unique"];

  // send data to parents
  @Output() itemSelected = new EventEmitter<string>();
  @Output() ratingSelected = new EventEmitter<number>();
  @Output() raritySelected = new EventEmitter<number>();
  @Output() enchantmentSelected_TypeUncommon = new EventEmitter<string>();
  @Output() enchantmentSelected_ValueUncommon = new EventEmitter<number>();
  @Output() enchantmentSelected_TypeRare = new EventEmitter<string>();
  @Output() enchantmentSelected_ValueRare = new EventEmitter<number>();
  @Output() enchantmentSelected_TypeEpic = new EventEmitter<string>();
  @Output() enchantmentSelected_ValueEpic = new EventEmitter<number>();
  @Output() enchantmentSelected_TypeLegendary = new EventEmitter<string>();  
  @Output() enchantmentSelected_ValueLegendary = new EventEmitter<number>();
  @Output() enchantmentSelected_TypeUnique = new EventEmitter<string>();
  @Output() enchantmentSelected_ValueUnique = new EventEmitter<number>();
  

  // HTTP METHOD 
  constructor(private http: HttpClient) {}
 
  // toma characters
  @Input()
  set classSelection(value: number) {
    this._classSelection = value;
    this.fetchList_Character(`http://127.0.0.1:8080/helmetlist/${this._classSelection}`);
  }
  get classSelection(): number {
    return this._classSelection;
  }
  //
  fetchList_Character(url: string) {
    this.http.get<{ list: ListItem[] }>(url).subscribe({
      next: (response) => {
        this.listCharacters = response.list;
        this.listCharacters.unshift({ image: 'assets/placeholder.png', name: '' });
      },
      error: (err) => {
        console.error('Error fetching head list:', err);
      },
    });
  }
  // reset selecciones
  resetSelection() {
    this.i = 0;
    this.selectedItem = null;
    this.showList = false;
    this.showContextMenu = false;
    this.selectedRarity = 0;
    this.listRating = [];
    for (const rarity in this.selectedEnchantments) {
      this.selectedEnchantments[rarity] = { type: '', value: 0 };
    }
    
  }
  /*
  toggleList() {
    this.showList = !this.showList; 
  }*/

  selectItem(item: ListItem) {
    this.resetSelection();
    this.selectedItem = item;
    this.itemSelected.emit(item.name);
    this.showList = !this.showList;
  
  }

  fetchList_Rating(url: string) {
    this.http.get<{ list: number[] }>(url).subscribe({
      next: (response) => {
        this.listRating = response.list
        this.listRating.unshift(0); // anade 0 a lista de ratings
        console.log(this.listRating);
      },
      error: (err) => {
        console.error('Error fetching head list:', err);
      },
    });
  }

  fetchEnchantment_List(url: string) {
    this.http.get<{ [key: string]: string[] }>(url).subscribe({  // Remove `list` from type
      next: (response) => { 
        this.enchantmentLists['uncommon'].types = response['listname_uncommon'];
        if (this.enchantmentLists['uncommon'].types = response['listname_uncommon'])  {
          this.enchantmentLists['rare'].types = response['listname_rare'];
        }
        //this.enchantmentLists['epic'].types = response['listname_epic'];
        // this.enchantmentLists['legendary'].types = response['listname_legendary'];
        //this.enchantmentLists['unique'].types = response['listname_unique']; 
      },// Should now log the array correctly
      error: (err) => {
        console.error('Error fetching enchantment list:', err);
      },
    });
  }

  fetchEnchantment_Value(url: string){
    this.http.get<{[key: string]: number[]}>(url).subscribe({
      next: (response) => {
      
      this.enchantmentLists['uncommon'].values = response['listvalue_uncommon'];
      this.enchantmentLists['rare'].values = response['listvalue_rare'];
      },
      error: (err) => {
        console.error('Error fetching enchantment list:', err);
      },
    });
  }
 
  // Assuming this should listen to a click on the component itself
  @HostListener('click', ['$event'])
  onLeftClick(event: MouseEvent) {
    this.showList = !this.showList;
    event.stopPropagation(); // Prevent document click from immediately closing it
  }

  @HostListener('contextmenu', ['$event'])
  onRightClick(event: MouseEvent) {
    event.preventDefault(); // Prevent browser context menu
    if (this.selectedItem && this.selectedItem.name) {
      this.showContextMenu = true;
    }
  }
  // Single document click handler for both list and context menu
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    this.showList = false;
    this.showContextMenu = false;
  }

  onChangeRarity(event: number) {
    this.selectedEnchantments['uncommon'].value = 0
    this.selectedEnchantments['rare'].value = 0;
    this.selectedRarity = +event;
    console.log(this.selectedRarity);
    this.rarityBoxColor();
    if (this.selectedItem?.name) {
      this.fetchList_Rating(`http://127.0.0.1:8080/helmetratinglist/?itemhelmet=${this.selectedItem.name}&rarityselect_helmet=${this.selectedRarity}`);
      this.fetchEnchantment_List(`http://127.0.0.1:8080/enchantmentlisthelmet/?itemhelmet=${this.selectedItem.name}`);
    }
    this.raritySelected.emit(this.selectedRarity);
    console.log(this.selectedRarity);
  }

  onChangeRating(event: number) {
    //const target = event.target as HTMLSelectElement;
    const index = +event;
    this.selectedRating = this.listRating[index];
    console.log(this.selectedRating);
    this.ratingSelected.emit(this.selectedRating);
  }

  onChangeEnchantment_TypeUncommon(event: string){
    this.selectedEnchantments['uncommon'].type = event;
    if (this.selectedEnchantments['uncommon'].value > 0) {
      this.selectedEnchantments['uncommon'].value = 0;
    }
    this.fetchEnchantment_Value(`http://127.0.0.1:8080/enchantmentlisthelmet/?enchantment_helmettype=${this.selectedEnchantments['uncommon'].type}`)
    this.fetchEnchantment_List(`http://127.0.0.1:8080/enchantmentlisthelmet/?enchantment_helmettype=${this.selectedEnchantments['uncommon'].type}`)
    this.enchantmentSelected_TypeUncommon.emit(this.selectedEnchantments['uncommon'].type);
  }
  onChangeEnchantment_ValueUncommon(event: number){
    console.log(this.enchantmentLists['uncommon'].types);
    this.enchantmentSelected_ValueUncommon.emit(this.selectedEnchantments['uncommon'].value)
  }

  onChangeEnchantment_TypeRare(event: string){
    if (this.selectedEnchantments['rare'].value > 0) {
      this.selectedEnchantments['rare'].value = 0;
    }
    this.selectedEnchantments['rare'].type = event;
    this.fetchEnchantment_Value(`http://127.0.0.1:8080/enchantmentlisthelmet/?enchantment_helmettype=${this.selectedEnchantments['uncommon'].type}&enchantment_helmettype2=${this.selectedEnchantments['rare'].type}`)
    this.enchantmentSelected_TypeRare.emit(this.selectedEnchantments['rare'].type);
    // console.log(this.selectedEnchantment_Rare);
   
  }
  onChangeEnchantment_ValueRare(event: number){
    this.selectedEnchantments['rare'].value = event;
    this.enchantmentSelected_ValueRare.emit(this.selectedEnchantments['rare'].value);
    //console.log(this.selectedEnchantValue_Rare);
  }


  rarityBoxColor(): string {
    switch (this.selectedRarity) {
      case 1: return 'rarity-poor';
      case 2: return 'rarity-common';
      case 3: return 'rarity-uncommon';
      case 4: return 'rarity-rare';
      case 5: return 'rarity-epic';
      case 6: return 'rarity-legendary';
      case 7: return 'rarity-unique';
      default: return 'rarity-default';
    }
  }
}