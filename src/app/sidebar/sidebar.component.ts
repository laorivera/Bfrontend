import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  // Add any properties or methods needed for the sidebar functionality
  menuItems: string[] = ['Home', 'About', 'Support'];

}
