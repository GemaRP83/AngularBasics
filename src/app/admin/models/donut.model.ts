export interface Donut {
    id?: string;    //? para que se pueda usar en el formulario del servicio
    name: string;
    icon: string;
    price: number;
    promo?: 'new' | 'limited';
    description: string;
}
