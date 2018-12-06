import { ShoppingCartService } from './../shopping-cart.service';
import { switchMap, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../models/product';
import { Subscription } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy{
// products: Product[] = []; 
products:any;
filteredProducts: Product[] = [];
category: string;
cart: any;
subscription: Subscription;

  constructor(
    private productService: ProductService, 
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService
    ) {  }
    async ngOnInit(){
     this.subscription = ( await this.shoppingCartService.getCart())
     .subscribe( cart => this.cart = cart);


    this.productService.getAll().pipe(switchMap(products => {
      this.products  = products;
      return this.route.queryParamMap;
    }))
    .subscribe(params => {
        this.category = params.get('category');
        this.filteredProducts = (this.category)?
        this.products.filter(p => p.category === this.category) : 
        this.products;
      });
    }

    ngOnDestroy(){
      this.subscription.unsubscribe();
    }
}
