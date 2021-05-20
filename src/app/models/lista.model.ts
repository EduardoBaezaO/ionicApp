import { ListaItem } from './lista-item.model';

export class Lista {
    id: number;
    titulo: string;
    creadaEn: Date;
    terminadaEn: Date;
    terminada: boolean;
    items: ListaItem[];

    constructor( titulo: string ){
        this.titulo = titulo;
        this.creadaEn = new Date();
        this.terminada = false;
        this.items = [];

        //generando un id con el numero de fecha el cual debería ser imposible que se repitiese!!!
        this.id = new Date().getTime(); // me da el mismo nro PLOP!!!
        let nro = new Date();
        this.id = nro.getTime();
    }
}