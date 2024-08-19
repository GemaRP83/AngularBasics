import { Component, OnInit } from '@angular/core';

import { Donut } from '../../models/donut.model';
import { DonutService } from '../../services/donut.service';

@Component({
  selector: 'donut-list',
  templateUrl: './donut-list.component.html',
  styleUrls: ['./donut-list.component.scss']
})
export class DonutListComponent implements OnInit {
  donuts!: Donut[];

  constructor(private donutService: DonutService) { }

  ngOnInit(): void {
    //uso del servicio sin métodos (array de donuts public)
    //this.donuts = this.donutService.donuts;

    //uso del servicio con métodos=> array private
    //this.donuts = this.donutService.read();

       //usamos http, nos suscribimos al observable
       this.donutService
         .read()
         .subscribe((donuts: Donut[]) => (this.donuts = donuts));

    //this.donut = this.donuts[0];
    //en lugar de el pipe en el template, se puede también:
    //this.donut = JSON.stringify(this.donuts[0]);    
  }

  trackById(index: number, value: Donut){
    return value.id;
  }

}
