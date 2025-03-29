import { Component, EventEmitter, Input, Output, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ListItem {
  name: string;
  image: string;
}
@Component({
  selector: 'chest-box',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chest-box.component.html',
  styleUrl: './chest-box.component.css'
})
export class ChestBoxComponent {
  private _classSelection: number = 0;
  showList = false;
  selectedItem: ListItem | null = null;
  selectedRarity: number = 0;
  selectedRating: number = 0;
  listCharacters: ListItem[] = [];
  listRating: number[] = [];
  showContextMenu = false;
  selectedRatingIndex: number = 0;

  rarityHead: string[] = ["No selection", "Poor", "Common", "Uncommon", "Rare", "Epic", "Legendary", "Unique"];

  @Output() itemSelected = new EventEmitter<string>();
  @Output() ratingSelected = new EventEmitter<number>();
  @Output() raritySelected = new EventEmitter<number>();

  // HTTP METHOD 
  constructor(private http: HttpClient) {}
 
  // toma characters
  @Input()
  set classSelection(value: number) {
    this._classSelection = value;
    this.fetchList(`http://127.0.0.1:8080/chestlist/${this._classSelection}`);
  }
  get classSelection(): number {
    return this._classSelection;
  }

  fetchList(url: string) {
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
    this.selectedItem = null;
    this.showList = false;
    this.showContextMenu = false;
    this.selectedRarity = 0;
    this.listRating = [];
  }

  toggleList() {
    this.showList = !this.showList; 
  }

  selectItem(item: ListItem) {
    this.resetSelection();
    this.selectedItem = item;
    this.itemSelected.emit(item.name);
    this.showList = false;
  }

  fetchRating(url: string) {
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
    this.selectedRarity = +event
    console.log(this.selectedRarity);
    if (this.selectedItem?.name) {
      this.fetchRating(`http://127.0.0.1:8080/chestratinglist/?itemchest=${this.selectedItem.name}&rarityselect_chest=${this.selectedRarity}`);
    }
    this.raritySelected.emit(this.selectedRarity);
    console.log(this.selectedRarity);
  }

  onChangeRating(event: number) {
    //const target = event.target as HTMLSelectElement;
    const index = +event
    this.selectedRating = this.listRating[index];
    console.log(this.selectedRating);
    this.ratingSelected.emit(this.selectedRating);
  }
  
}
  /*
   private _classSelection: number = 0;

   constructor(private http: HttpClient) {}

   showList = false;
    
   selectedItem: ListItem | null = null;

   list: ListItem[] = [];

    // Use a setter for classSelection to trigger the API call
    @Input() 
    set classSelection(value: number) {
      console.log('Class selection updated:', value); // Debug log
      this._classSelection = value;
      this.fetchList(`http://127.0.0.1:8080/chestlist/${this._classSelection}`);
    }
    get classSelection(): number {
      return this._classSelection;
    }

    @Output() itemSelected = new EventEmitter<string>();

    fetchList(url: string) {
      console.log('Fetching list from:', url); // Debug log
      this.http.get<{ list: ListItem[] }>(url).subscribe({
        next: (response) => {
          console.log('API response:', response); // Debug log
          this.list = response.list;
          this.list.unshift({ image: 'assets/placeholder.png', name: '' });
        },
        error: (err) => {
          console.error('Error fetching head list:', err);
        },
      });
    }

    resetSelection() {
      this.selectedItem = null;
    }
  
    toggleList() {
      this.showList = !this.showList;
    }
  
    selectItem(item: ListItem) {
      this.selectedItem = item;
      this.showList = false;
      this.itemSelected.emit(item.name);
    }
}
  */
   
