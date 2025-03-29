import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface ListItem {
  name: string;
  image: string;
}

@Component({
  selector: 'app-chest-box',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="equipment-box chest-box" (click)="toggleList()">
      <img
        [src]="selectedItem?.image || 'assets/placeholder.png'"
        alt="Chest Item"
        class="equipment-image"
      />
      @if (showList) {
        <div class="equipment-list">
          @for (item of list; track item.name) {
            <div (click)="selectItem(item)" class="equipment-item">
              <img [src]="item.image" [alt]="item.name" />
              <span>{{ item.name }}</span>
            </div>
          }
        </div>
      }
    </div>
  `,
})
export class ChestBoxComponent {
  showList = false;
  selectedItem: ListItem | null = null;
  list: ListItem[] = [];
  constructor(private http: HttpClient) {}
  ngOnInit() { this.fetchList('http://127.0.0.1:8080/chestlist/'); }
  fetchList(url: string) {
    this.http.get<{ list: ListItem[] }>(url).subscribe({
      next: (response) => { this.list = response.list; },
      error: (err) => { console.error('Error fetching head list:', err); },
    });
  }
  toggleList() { this.showList = !this.showList; }
  selectItem(item: ListItem) { this.selectedItem = item; this.showList = false; }
}