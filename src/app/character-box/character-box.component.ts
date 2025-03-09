import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

// Define the Character interface
interface Character {
  name: string;
  image: string;
}

// Component decorator
@Component({
  selector: 'app-character-box', // HTML tag for this component
  standalone: true, // Marks this as a standalone component
  imports: [CommonModule], // Import CommonModule for Angular directives
  template: `
    <div class="character-box" (click)="toggleList()">
      <p></p>
      <img
        [src]="selectedCharacter?.image || 'assets/placeholder.png'"
        alt="Character"
        class="character-image"
      />
      @if (showList) {
        <div class="character-list">
          @for (character of characters; track character.name) {
            <div
              (click)="selectCharacter(character)"
              class="character-item"
              role="button"
              tabindex="0"
            >
              <img [src]="character.image" [alt]="character.name" class="character-image" />
              <span>{{ character.name }}</span>
           </div>
          }
        </div>
      }
      @if (isLoading) {
        <div class="loading">Loading...</div>
      }
      @if (error) {
        <div class="error">Failed to load characters. Please try again.</div>
      }
    </div>
  `,
  styles: [
    `
      .character-box {
        position: relative;
        width: 150px;
        cursor: pointer;
        border: 2px solid green; /* Temporary border */
      }

      .character-image {
        width: 100%;
        border-radius: 8px;
      }

      .character-list {
        position: absolute;
        top: 100%;
        left: 0;
        background: white;
        border: 1px solid #ccc;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        z-index: 10;
        width: 120px;
        border: 2px solid blue; /* Temporary border */
      }

      .character-item {
        display: flex;
        align-items: center;
        padding: 8px;
        cursor: pointer;
      }

      .character-item:hover {
        background: rgb(165, 165, 165);
      }

      .character-item img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 8px;
      }

      .loading,

      .error {
        padding: 8px;
        text-align: center;
      }

      .error {
        color: red;
      }
    `,
  ],
})
export class CharacterBoxComponent {
  // Component state
  showList = false; // Controls whether the list is visible
  selectedCharacter: Character | null = null; // Currently selected character
  characters: Character[] = []; // List of characters
  isLoading = false; // Loading state
  error: string | null = null; // Error message

  // Inject HttpClient for API calls
  constructor(private http: HttpClient) {}

  // Lifecycle hook: Called after component initialization
  ngOnInit() {
    this.fetchCharacters();
  }

  // Fetch characters from the API
  fetchCharacters() {
    this.isLoading = true;
    this.error = null;

    this.http.get<{ characters: Character[] }>('http://127.0.0.1:8080/helmetlist/').subscribe({
      next: (response) => {
        console.log('Characters fetched:', response); // Log the data
        this.characters = response.characters; // Assign the characters array
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load characters. Please try again.';
        this.isLoading = false;
        console.error('Error fetching characters:', err);
      },
    });
  }

  // Toggle the visibility of the character list
  toggleList() {
    this.showList = !this.showList;
    console.log('showList:', this.showList); // Debugging
  }
  

  // Select a character and update the selectedCharacter
  selectCharacter(character: Character) {
    this.selectedCharacter = character;
    this.showList = false; // Hide the list after selection
  }
}