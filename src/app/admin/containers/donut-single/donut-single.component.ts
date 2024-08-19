import { Component, OnInit } from '@angular/core';
import { Donut } from '../../models/donut.model';
import { DonutService } from '../../services/donut.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'donut-single',
  templateUrl: './donut-single.component.html',
  styleUrls: ['./donut-single.component.scss']
})
export class DonutSingleComponent implements OnInit {

  donut!: Donut;
  isEdit!: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private donutService: DonutService) { }

  ngOnInit(): void {
    //esto era para probar con un elemento la parte de los formularios
    /* this.donut = {
        id: 'y8z0As',
        name: 'Just Chocolate',
        icon: 'just-chocolate',
        price: 119,  
        //promo: 'limited',
        description: 'For the pure chocoholic.'
      } */

     //Formulario con el uso del servicio --share state
     /* const id= 'y8z0As';
     this.donut = this.donutService.donuts.find(
      (donut: Donut)=> donut.id === id) || {name:'', icon:'', price:0, description:''}; */
     
      //usamos el método para leer un solo elemento del array private donuts
      //this.donut = this.donutService.readOne('y8z0As');
      //this.donut = this.donutService.readOne('8amkZ9');

      //usamoa la ruta para acceder a través del id con paraMap
      const id = this.route.snapshot.paramMap.get('id');
      //console.log(id);
      //ahora con observables para http
      this.donutService
      //ahora lo hacemos a través del id clicado
        .readOne(id)
       // .readOne('rG1l14-') //este id lo va cambiando para ir probando según sea crear/actualizar o borrar
        .subscribe((donut: Donut) => (this.donut = donut));
      
      //añadimos que aparezca los botones en función de si es para ruta new o edit
      this.isEdit = this.route.snapshot.data['isEdit'];
  }
  
  onCreate(donut: Donut){
    this.donutService
      .create(donut)
      //sustitutimos console.log del método por la ruta
      .subscribe((donut) => 
        this.router.navigate(['admin', 'donuts', donut.id])
    );
      //.subscribe(() => console.log('Created successfully!'));
    
  }

  /* onCreate(donut: Donut){
    this.donutService.create(donut);
    //console.log('onCreate', donut);
  }
 */

  onUpdate(donut: Donut){
    this.donutService.update(donut).subscribe({
      //sustitutimos console.log del método por la ruta
      next: () => this.router.navigate(['admin']),
      error: (err) => console.log('onUpdate error', err)
    });       
      //.subscribe(() => console.log('Updated successfully!'));
  }

  /* onUpdate(donut: Donut){
    this.donutService.update(donut);
  } */

    onDelete(donut: Donut){
      this.donutService
        .delete(donut)
        .subscribe(() => console.log(`Deleted successfully!`));
    }

  /* onDelete(donut: Donut){
    this.donutService.delete(donut);
  } */
}
