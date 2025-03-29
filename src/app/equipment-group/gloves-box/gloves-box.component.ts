import { Component, EventEmitter, Output, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface ListItem {
  name: string;
  image: string;
}

@Component({
  selector: 'gloves-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gloves-box.component.html',
  styleUrl: './gloves-box.component.css'
  
})
export class GlovesBoxComponent {
  private _classSelection: number = 0;

  showList = false;
  selectedItem: ListItem | null = null;
  list: ListItem[] = [];
  
  constructor(private http: HttpClient) {}
  
    // Use a setter for classSelection to trigger the API call
  @Input() 
    set classSelection(value: number) {
      console.log('Class selection updated:', value); // Debug log
      this._classSelection = value;
      this.fetchList(`http://127.0.0.1:8080/gloveslist/${this._classSelection}`);
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