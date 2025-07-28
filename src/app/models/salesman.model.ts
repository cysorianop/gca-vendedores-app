export interface Coordinates {
  latitude: number;
  longitude: number;
  height: number;
}

export interface Salesman {
  id: string;
  name: string;
  category: string;
  address: string;
  isActive: boolean;
  coordinates: Coordinates;
  photo: string;
  vehicle: string;
}

export interface CreateSalesmanRequest {
  id: string;
  name: string;
  category: string;
  address: string;
  photo: string;
  vehicle: string;
}

export enum SalesmanCategory {
  GERENTE = 'Gerente',
  VENDEDOR_SENIOR = 'Vendedor Senior',
  VENDEDOR_JUNIOR = 'Vendedor Junior',
  VENDEDOR = 'Vendedor'
}

export interface MarkerInfo {
  salesman: Salesman;
  marker?: google.maps.Marker;
  infoWindow?: google.maps.InfoWindow;
}