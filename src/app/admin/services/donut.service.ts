import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { tap, of, map, throwError, catchError, retryWhen, delay, take } from 'rxjs';

import { Donut } from '../models/donut.model';


@Injectable({
  providedIn: 'root'
})
export class DonutService {
  //usamos API rest para los datos
  private donuts: Donut[] = [];

   /* private donuts: Donut[] = [
    {
      id: 'y8z0As',
      name: 'Just Chocolate',
      icon: 'just-chocolate',
      price: 119,  
      promo: 'limited',
      description: 'For the pure chocoholic.'
    },
    {
      id: '3u98kl',
      name: 'Glazed Fudge',
      icon: 'glazed-fudge',
      price: 129,
      promo:'new',
      description: 'Sticky perfection.'
    },
    {
      id: 'ae098s',
      name: 'Caramel Swirl',
      icon: 'caramel-swirl',
      price: 129,      
      description: 'Chocolate drizzled with caramel.'
    },
    {
      id: '8amkZ9',
      name: 'Sour Supreme',
      icon: 'sour-supreme',
      price: 139,      
      description: 'For the sour advocate.'
    },
    {
      id: '13M0nz',
      name: 'Zesty Lemon',
      icon: 'zesty-lemon',
      price: 129,      
      description: 'Delicious lucious lemon.'
    }
  ]; */

  constructor(private http: HttpClient) { }

  read(){
    //usando el array de datos dentro del servicio:
    //return this.donuts;
    
    //permite cargar los datos si no encuentra respuesta http cpn observable
    if(this.donuts.length){
      return of(this.donuts);
    }
    //HttpHeaders
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    headers = headers.append('Api-Token', '1234abcd');

    const options ={
      headers,
    };

    //usando Http. Después se añaden las opciones para los HttpHeaders
   return this.http.get<Donut[]>(`/api/donuts`, options)
     .pipe(
      tap((donuts) => {
        this.donuts = donuts;
      }),
      retryWhen((errors) => errors.pipe(delay(5000), take(2))),
      catchError(this.handleError)
     );
    
  }
  readOne(id: string | null){ //ponemos que sea nulo también para poder hacer con la ruta del parámetro
    return this.read().pipe(
      map((donuts) => {
        const donut = donuts.find(
          (donut: Donut)=> donut.id === id);
    
        if(donut){
          return donut;
        }else{
         return {name:'', icon:'', price:0, description:''}
        }    
      })
    )    
  }


 /*  readOne(id: string){
    const donut = this.read().find(
      (donut: Donut)=> donut.id === id);

    if(donut){
      return donut;
    }else{
     return {name:'', icon:'', price:0, description:''}
    }    
  }
 */
  /* readOne(id: string){
    const donut = this.read().find(
      (donut: Donut)=> donut.id === id);

    if(donut){
      return donut;
    }else{
     return {name:'', icon:'', price:0, description:''}
    }    
  } */
    
  create(payload: Donut){
    return this.http.post<Donut>(`/api/donuts`, payload)
    .pipe(
      tap((donut) => {
        this.donuts = [...this.donuts, payload];
      }),
      catchError(this.handleError)
    );    
  }

/* 
  create(payload: Donut){
    this.donuts = [...this.donuts, payload];
    console.log(this.donuts);
  } */

    update(payload: Donut){
      return this.http.put<Donut>(`/api/donuts/${payload.id}`, payload)
      .pipe(
        tap((donut) => {
          this.donuts = this.donuts.map((item: Donut) => {
            if(item.id === payload.id){
              return donut;
            }
            return item;
          });
        }),
        catchError(this.handleError)
      );      
    }

  /* update(payload: Donut){
    this.donuts = this.donuts.map((donut: Donut) => {
      if(donut.id === payload.id){
        return payload;
      }
      return donut;
    });
    console.log(this.donuts);
  }
 */
  delete(payload: Donut){
    return this.http.delete<Donut>(`/api/donuts/${payload.id}`)
    .pipe(
      tap(() => {
        this.donuts = this.donuts.filter((donut: Donut) => donut.id !== payload.id);        
      }),
      catchError(this.handleError)
    );   
  }

  /* delete(payload: Donut){
    this.donuts = this.donuts.filter((donut: Donut) => donut.id !== payload.id);
    console.log(this.donuts);
  } */

    private handleError(err: HttpErrorResponse){
      //console.warn(err);
      //observamos el evento del error para saber si es del lado del cliente o del servidor
      if(err.error instanceof ErrorEvent){
        //client-side
        console.warn(`Client`, err.message);
      }else{
        //server-side
        console.warn(`Server`, err.status);
      }
      return throwError(() => new Error(err.message));
    }
}
