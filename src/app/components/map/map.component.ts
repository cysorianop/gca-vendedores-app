import { Component, OnInit, AfterViewInit, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  GoogleMapsModule,
  MapInfoWindow,
  MapMarker
} from '@angular/google-maps';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { SalesmanService } from '../../services/salesman.service';
import { Salesman } from '../../models/salesman.model';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule, MatIconModule, MatCardModule, GoogleMapsModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
  salesmen: Salesman[] = [];

  center = { lat: 4.6097, lng: -74.0817 };
  zoom = 12;

  selectedSalesman: Salesman | null = null;

  @ViewChildren(MapMarker) mapMarkers!: QueryList<MapMarker>;
  infoWindow!: MapInfoWindow;

  constructor(private salesmanService: SalesmanService) {}

  ngOnInit(): void {
    console.log('Cargando componente map...');
    this.salesmanService.salesmen$.subscribe((data) => {
      this.salesmen = data;
    });
  }

  ngAfterViewInit(): void {
  }

  setInfoWindow(infoWindow: MapInfoWindow) {
    this.infoWindow = infoWindow;
  }

  openInfoWindow(index: number) {
    this.selectedSalesman = this.salesmen[index];
    const marker = this.mapMarkers.get(index);
    if (marker && this.infoWindow) {
      this.infoWindow.open(marker);
    }
  }

  get activeSalesmenCount(): number {
    return this.salesmen.filter((s) => s.isActive).length;
  }

  get inactiveSalesmenCount(): number {
    return this.salesmen.filter((s) => !s.isActive).length;
  }

  getMarkerIcon(isActive: boolean): google.maps.Icon {
    return {
      url: isActive
        ? 'assets/images/pins/green-pin.png'
        : 'assets/images/pins/red-pin.png',
      scaledSize: new google.maps.Size(30, 30)
    };
  }
}
