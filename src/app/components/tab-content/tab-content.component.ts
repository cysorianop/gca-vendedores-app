import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { SalesmanService } from '../../services/salesman.service';
import { Salesman } from '../../models/salesman.model';

interface DashboardCard {
  title: string;
  value: string;
  icon: string;
  change: string;
  color: string;
}

interface ChartDataItem {
  month: string;
  sales: number;
}

interface ActivityItem {
  id: number;
  salesman: string;
  action: string;
  time: string;
  icon: string;
  type: string;
}

@Component({
  selector: 'app-tab-content',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './tab-content.component.html',
  styleUrls: ['./tab-content.component.scss'],
})
export class TabContentComponent implements OnInit {
  dashboardCards: DashboardCard[] = [];
  chartData: ChartDataItem[] = [];
  recentActivities: ActivityItem[] = [];

  constructor(private salesmanService: SalesmanService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.salesmanService.salesmen$.subscribe((salesmen: Salesman[]) => {
      const active = salesmen.filter((s) => s.isActive).length;
      const total = salesmen.length;

      this.dashboardCards = [
        {
          title: 'Total de Vendedores',
          value: total.toString(),
          icon: 'group',
          change: '',
          color: 'primary',
        },
        {
          title: 'Vendedores Activos',
          value: active.toString(),
          icon: 'check_circle',
          change: '',
          color: 'accent',
        },
        {
          title: 'Inactivos',
          value: (total - active).toString(),
          icon: 'highlight_off',
          change: '',
          color: 'warn',
        },
      ];

      this.chartData = salesmen.map((s, index) => ({
        month: s.name,
        sales: Math.floor(Math.random() * 100) + 1,
      }));

      this.recentActivities = salesmen.slice(0, 3).map((s, i) => ({
        id: i + 1,
        salesman: s.name,
        action: 'Ubicación actualizada',
        time: 'Hace ' + (i + 1) * 2 + ' horas',
        icon: 'location_on',
        type: 'info',
      }));
    });
  }

  trackByTitle(index: number, item: DashboardCard): string {
    return item.title;
  }

  trackByMonth(index: number, item: ChartDataItem): string {
    return item.month;
  }

  trackById(index: number, item: ActivityItem): number {
    return item.id;
  }
}
