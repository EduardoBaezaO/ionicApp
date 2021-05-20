import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeseosService } from '../../services/deseos.service';
import { Lista } from '../../models/lista.model';
import { ListaItem } from '../../models/lista-item.model';
import { createOfflineCompileUrlResolver } from '@angular/compiler';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  checkTarea={isChecked:false}

  lista: Lista;
  nombreItem: string = '';

  constructor( private deseosService: DeseosService,
               private route: ActivatedRoute ) { 

      const listaId = this.route.snapshot.paramMap.get( 'listaId' );

      console.log(listaId);

      this.lista = this.deseosService.obtenerLista( listaId );

      console.log(this.lista);

  }

  ngOnInit() {
  }

  agregarItem(){
    if( this.nombreItem.length === 0 ) {
      return;
    }
    const nuevoItem = new ListaItem( this.nombreItem );
    this.lista.items.push( nuevoItem );

    this.nombreItem = '';
    this.deseosService.guardarStorage();

    console.log('agregaItem()');

  }

  updateItemCompletado( item: ListaItem){
    console.log(item);

    const pendientes = this.lista.items
                            .filter( itemData => !itemData.completado )
                            .length;

    console.log({pendientes});
    if (pendientes === 0){
      this.lista.terminadaEn = new Date();
      this.lista.terminada = true;
    }else{
      this.lista.terminadaEn = null;
      this.lista.terminada = false;
    }

    this.deseosService.guardarStorage();

    console.log(this.deseosService.listas);

  }

  borrar( i: number ){
    this.lista.items.splice(i,1);
    this.deseosService.guardarStorage();
  }

}
