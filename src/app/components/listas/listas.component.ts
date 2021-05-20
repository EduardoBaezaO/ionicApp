import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DeseosService } from '../../services/deseos.service';
import { Lista } from '../../models/lista.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @Input() tabPg: 1;
  tareasPendientes: number;
  listas: Lista[];

  constructor( public deseosService: DeseosService,
                private router: Router,
                private alertCtrl: AlertController) {}

  ngOnInit() {
    this.listas = this.deseosService.obtenerListas( this.tabPg );
  }
  
  verTareas( lista: Lista ){
    // console.log("verTareas()");
    // console.log(lista.titulo);
    // console.log(this.tabPg);
    // this.router.navigateByUrl(`/tabs/tab1/agregar/${ lista.id }`);
    this.router.navigateByUrl(`/tabs/tab${ this.tabPg }/agregar/${ lista.id }`);
  }

  async borrarLista( lista: Lista ){
    if (this.deseosService.tareasPendientes( lista ) > 0)  {
      const alert = await this.alertCtrl.create({
        cssClass: 'my-custom-class',
        header: 'Atención !!! ',
        message: `Lista ${ lista.titulo }, tiene ${ lista.items.filter( listaT => !listaT.completado ).length } tareas pendientes`,
        // inputs: [
        //   {
        //     name: 'titulo',
        //     type: 'text',
        //     placeholder: 'Nombre de la lista'
        //   }
        // ],
        buttons: [
          {
            text: 'Aceptar',
            role: 'cancel',
            handler: () => {
              console.log('Cancelar');
            }
          }
          // ,
          // {
          //   text: 'Crear',
          //   handler: ( data ) => {
          //     console.log( data );
          //     if ( data.titulo.length === 0 ){
          //       return;
          //     }
  
          //     const listaId = this.deseosService.crearLista( data.titulo );
  
          //     this.router.navigateByUrl(`/tabs/tab1/agregar/${ listaId }`);
          //   }
          // }
        ]
      });
  
      alert.present();
    }else{
      this.deseosService.borrarLista( lista );
    }
  }
}
