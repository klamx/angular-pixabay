import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImagenService {
  private error$ = new Subject<string>();
  private terminoBusqueda$ = new Subject<string>();

  constructor(private http: HttpClient) {}

  setError(mensaje: string): void {
    this.error$.next(mensaje);
  }

  getError(): Observable<string> {
    return this.error$.asObservable();
  }

  enviarTerminoBusqueda(termino: string): void {
    this.terminoBusqueda$.next(termino);
  }

  getTerminoBusqueda(): Observable<string> {
    return this.terminoBusqueda$.asObservable();
  }

  getImagenes(termino: string, pag: number): Observable<any> {
    const key = '20273705-7bd26e74a9a15f21cf176a4ac';
    const URL =
      'https://pixabay.com/api/?key=' +
      key +
      '&q=' +
      termino +
      '&per_page=20&page=' +
      pag;
    return this.http.get(URL);
  }
}
