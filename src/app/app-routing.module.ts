import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayuotComponent} from "./views/layuot.component";

const routes: Routes = [
  {
    path: '',
    component: LayuotComponent,
    children: [
      {path: '', loadChildren: () => import('./views/main/main.module').then(m => m.MainModule)},
      {path: 'order', loadChildren: () => import('./views/order/order.module').then(m => m.OrderModule)},
      {path: 'catalog', loadChildren: () => import('./views/products/products.module').then(m => m.ProductsModule)}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
