import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImagenService } from 'src/app/services/imagen.service';

@Component({
  selector: 'app-listar-imagen',
  templateUrl: './listar-imagen.component.html',
  styleUrls: ['./listar-imagen.component.css'],
})
export class ListarImagenComponent implements OnInit {
  termino: string = '';
  suscripcion: Subscription;
  listImagenes: any[] = [];
  loading: boolean;
  pag: number = 1;
  totalPag: number;

  constructor(private _imagenService: ImagenService) {
    this.termino = '';
    this.loading = false;
    this.suscripcion = this._imagenService
      .getTerminoBusqueda()
      .subscribe((data) => {
        this.termino = data;
        this.loading = true;
        this.pag = 1;
        this.obtenerImagenes();
      });
  }

  ngOnInit(): void {
    this.obtenerImagenes();
  }

  obtenerImagenes() {
    this._imagenService.getImagenes(this.termino, this.pag).subscribe(
      (data) => {
        this.loading = false;
        if (data.hits.length === 0) {
          this._imagenService.setError(
            'Opss... no encontramos ningun resultado.'
          );
          return;
        }

        this.listImagenes = data.hits;
        this.totalPag = Math.floor(data.totalHits / 20);
      },
      (error) => {
        this._imagenService.setError('Opps... Ocurrio un error.');
        this.loading = false;
        return;
      }
    );
  }

  siguiente(): void {
    this.pag++;
    this.loading = true;
    this.obtenerImagenes();
  }

  anterior(): void {
    if (this.pag > 0) {
      this.pag--;
      this.loading = true;
      this.obtenerImagenes();
    }
  }
}
