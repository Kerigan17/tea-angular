import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {ProductType} from "../../../../types/product.type";
import {CartService} from "../../../shared/services/cart.service";

@Component({
  selector: 'catalog',
  templateUrl: './catalog.component.html',
  styleUrls: []
})
export class CatalogComponent implements OnInit{
  constructor(private http: HttpClient,
              private cartService: CartService,
              private router: Router) {
  }

  products: ProductType[] = [];
  ngOnInit() {
    this.cartService.getProducts()
      .subscribe(
        {
          next: (data: ProductType[])=>{
            this.products = data;
          },
          error: (error)=>{
            console.log(error)
            this.router.navigate(['/'])
          }
        }
      )
  }
}
