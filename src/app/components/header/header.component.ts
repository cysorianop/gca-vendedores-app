import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    RouterModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  title = 'Salesman Tracker';
  tabs = [
    { label: 'Mapa', icon: 'map', route: '/map' },
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' }
  ];

  selectedTabIndex = 0;

  @Output() tabChange = new EventEmitter<number>();

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const index = this.tabs.findIndex(tab =>
          event.urlAfterRedirects.includes(tab.route)
        );
        if (index !== -1) {
          this.selectedTabIndex = index;
        }
      });
  }

  onTabChange(index: number) {
    this.selectedTabIndex = index;
    this.tabChange.emit(index);
  }

  onRefresh() {
    console.log('Refrescando datos...');
  }
}
