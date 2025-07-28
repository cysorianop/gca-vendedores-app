import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, timer } from 'rxjs';
import { switchMap, catchError, tap } from 'rxjs/operators';
import { Salesman, CreateSalesmanRequest } from '../models/salesman.model';

@Injectable({
  providedIn: 'root',
})
export class SalesmanService {
  private readonly apiUrl = 'http://52.188.225.26/api/salesman';
  private salesmenSubject = new BehaviorSubject<Salesman[]>([]);
  public salesmen$ = this.salesmenSubject.asObservable();

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  };

  constructor(private http: HttpClient) {
    this.startAutoRefresh();
  }

  /**
   * Obtiene la lista completa de vendedores
   */
  getSalesmen(): Observable<Salesman[]> {
    return this.http.get<Salesman[]>(this.apiUrl, this.httpOptions).pipe(
      tap((salesmen) => {
        this.salesmenSubject.next(salesmen);
      }),
      catchError(this.handleError<Salesman[]>('getSalesmen', []))
    );
  }

  /**
   * Obtiene un vendedor específico por ID
   */
  getSalesmanById(id: string): Observable<Salesman> {
    const url = `${this.apiUrl}/${id}`;
    return this.http
      .get<Salesman>(url, this.httpOptions)
      .pipe(catchError(this.handleError<Salesman>(`getSalesmanById id=${id}`)));
  }

  /**
   * Crea un nuevo vendedor
   */
  createSalesman(salesman: CreateSalesmanRequest): Observable<Salesman> {
    return this.http
      .post<Salesman>(this.apiUrl, salesman, this.httpOptions)
      .pipe(
        tap((newSalesman: Salesman) => {
          const currentSalesmen = this.salesmenSubject.value;
          this.salesmenSubject.next([...currentSalesmen, newSalesman]);
        }),
        catchError(this.handleError<Salesman>('createSalesman'))
      );
  }

  /**
   * Actualiza automáticamente los datos cada 30 segundos
   */
  private startAutoRefresh(): void {
    timer(0, 30000)
      .pipe(switchMap(() => this.getSalesmen()))
      .subscribe();
  }

  /**
   * Obtiene vendedores activos solamente
   */
  getActiveSalesmen(): Observable<Salesman[]> {
    return this.salesmen$.pipe(
      tap((salesmen) => salesmen.filter((s) => s.isActive))
    );
  }

  /**
   * Filtra vendedores por categoría
   */
  getSalesmenByCategory(category: string): Observable<Salesman[]> {
    return this.salesmen$.pipe(
      tap((salesmen) => salesmen.filter((s) => s.category === category))
    );
  }

  /**
   * Obtiene el pin del mapa según la categoría
   */
  getPinByCategory(category: string): string {
    const pinMap: { [key: string]: string } = {
      Administrador: 'assets/images/pins/pin1.svg',
      'Vendedor Senior': 'assets/images/pins/pin2.svg',
      'Vendedor': 'assets/images/pins/pin3.svg',
      Operadora: 'assets/images/pins/pin4.svg',
    };
    return pinMap[category] || 'assets/images/pins/pinselected.svg';
  }

  /**
   * Manejo de errores HTTP
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error);

      this.showErrorMessage(`Error en ${operation}: ${error.message}`);

      return new Observable<T>((observer) => {
        observer.next(result as T);
        observer.complete();
      });
    };
  }

  /**
   * Muestra mensaje de error al usuario
   */
  private showErrorMessage(message: string): void {
    console.error(message);
  }

  /**
   * Refresca manualmente los datos
   */
  refreshData(): void {
    this.getSalesmen().subscribe();
  }

  /**
   * Obtiene el estado actual de los vendedores
   */
  getCurrentSalesmen(): Salesman[] {
    return this.salesmenSubject.value;
  }

  addSalesman(salesman: Salesman): void {
    const current = this.salesmenSubject.value;
    this.salesmenSubject.next([...current, salesman]);
  }

  updateSalesman(updated: Salesman): void {
    const updatedList = this.salesmenSubject.value.map((s) =>
      s.id === updated.id ? updated : s
    );
    this.salesmenSubject.next(updatedList);
  }

  removeSalesman(id: string): void {
    const filtered = this.salesmenSubject.value.filter((s) => s.id !== id);
    this.salesmenSubject.next(filtered);
  }
}
