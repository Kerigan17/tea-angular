import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductType} from "../../../types/product.type";
import {OrderType} from "../../../types/order.type";

@Injectable({
  providedIn: 'root'
})

export class CartService implements OnInit{
  private url: string = 'https://testologia.site/';
  constructor(private http: HttpClient) { }

  ngOnInit() {

  }

  getProducts(): Observable<ProductType[]>{
    return this.http.get<ProductType[]>(`${this.url}tea`);
  }

  getProduct(id: number): Observable<ProductType> {
    return this.http.get<ProductType>(`${this.url}tea?id=${id}`);
  }

  createOrder(data: OrderType) {
    return this.http.post<{ success: number, message?: string}>( `${this.url}order-tea`, data);
  }
}
