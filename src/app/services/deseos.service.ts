import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {

  listas: Lista[] = [];

  constructor() { 
    console.log("servicio iniciado ok");

    this.cargarStorage(); 

    // const lista1 = new Lista('Recolectar piedras del infinito')
    // const lista2 = new Lista('Héroes a desaparecer');

    // this.listas.push(lista1, lista2);

    // console.log(this.listas);
  }

  crearLista( titulo: string ){
    const nuevaLista = new Lista(titulo);
    this.listas.push( nuevaLista );
    this.guardarStorage();
    // console.log(nuevaLista);
    return nuevaLista.id;
  }

  obtenerLista(id: string | number ){
    id = Number(id);
    return this.listas.find( listaData => listaData.id === id );
  }

  borrarLista( lista: Lista ){
    // console.log(lista.id);
      this.listas = this.listas.filter( listaData => listaData.id !== lista.id );   
      this.guardarStorage();    
  }

  guardarStorage(){
    localStorage.setItem('data', JSON.stringify( this.listas ));
  }S

  cargarStorage(){ 
    if ( localStorage.getItem('data') ){
      this.listas = JSON.parse( localStorage.getItem( 'data' ));
    }else{
      this.listas = [];
    }
  }

  tareasPendientes( lista: Lista ){
    return lista.items.filter( tp => !tp.completado ).length;
  };

  obtenerListas( tabPg: number ){
    console.log(tabPg);
    if (tabPg === 1){
      return this.listas.filter( terminadas => !terminadas.terminada)
    }
    if(tabPg === 2){
      return this.listas.filter( terminadas => terminadas.terminada)
    }
  }

}
