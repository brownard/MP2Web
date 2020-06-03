import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../services/themes/theme.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  constructor(private themeService: ThemeService) { }

  isExpanded = false;
  isDarkMode = false;

  ngOnInit(): void {
    this.isDarkMode = this.themeService.currentTheme == 'theme-dark';
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  toggleDarkMode(e) {
    this.isDarkMode = e;
    this.themeService.setTheme(this.isDarkMode ? 'theme-dark' : '');
  }
}
