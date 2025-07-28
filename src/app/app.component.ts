import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MapComponent } from './components/map/map.component';
import { TabContentComponent } from './components/tab-content/tab-content.component';

import { SalesmanService } from './services/salesman.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    HeaderComponent,
    SidebarComponent,
    MapComponent,
    TabContentComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'salesman-tracker';
  isLoading = true;
  selectedTabIndex = 0;

  constructor(private salesmanService: SalesmanService) {}

  ngOnInit() {
    // carga de datos desde la API
    this.salesmanService.salesmen$.subscribe((salesmen) => {
      console.log('✅ Vendedores recibidos desde API:', salesmen);
      if (salesmen.length > 0) {
        this.isLoading = false;
      }
    });

    this.salesmanService.refreshData();
  }

  onTabChange(index: number) {
    this.selectedTabIndex = index;
  }
}
