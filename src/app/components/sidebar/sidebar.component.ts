import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { SalesmanService } from '../../services/salesman.service';
import { SalesmanModalComponent } from '../salesman-modal/salesman-modal.component';
import { Salesman } from '../../models/salesman.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  salesmen: Salesman[] = [];
  salesmenStats = {
    total: 0,
    active: 0,
    inactive: 0
  };

  constructor(
    private dialog: MatDialog,
    private salesmanService: SalesmanService
  ) {}

  ngOnInit() {
    this.salesmanService.salesmen$.subscribe((data) => {
      this.salesmen = data;
      this.updateStats();
    });
  }

  updateStats() {
    this.salesmenStats.total = this.salesmen.length;
    this.salesmenStats.active = this.salesmen.filter(s => s.isActive).length;
    this.salesmenStats.inactive = this.salesmen.filter(s => !s.isActive).length;
  }

  get activeSalesmen() {
    return this.salesmen.filter(s => s.isActive);
  }

  get inactiveSalesmen() {
    return this.salesmen.filter(s => !s.isActive);
  }

  openSalesmanModal(salesman?: Salesman) {
    const dialogRef = this.dialog.open(SalesmanModalComponent, {
      width: '500px',
      data: salesman || null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          this.salesmanService.updateSalesman(result);
        } else {
          result.id = crypto.randomUUID();
          this.salesmanService.addSalesman(result);
        }
      }
    });
  }

  deleteSalesman(salesman: Salesman) {
    if (confirm(`¿Estás seguro de eliminar a ${salesman.name}?`)) {
      this.salesmanService.removeSalesman(salesman.id);
    }
  }

  trackById(index: number, salesman: Salesman): string {
    return salesman.id;
  }
}


 