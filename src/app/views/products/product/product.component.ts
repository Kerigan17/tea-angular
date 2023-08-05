import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ProductType} from "../../../../types/product.type";
import {CartService} from "../../../shared/services/cart.service";

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit{
  product: ProductType = {
    id: 0,
    image: '',
    title: '',
    price: 0,
    description: ''
  };

  constructor(private http: HttpClient,
              private cartService: CartService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params)=>{
      if (params['id']) {
        this.cartService.getProduct(+params['id'])
          .subscribe(
            {
              next: (data: ProductType)=>{
                this.product = data;
              },
              error: (error)=>{
                console.log(error)
                this.router.navigate(['/'])
              }
            }
          )
      }
    })
  }
  orderProduct(title: string) {
    this.router.navigate(['/order'], {queryParams: {title: title}});
  }
}
