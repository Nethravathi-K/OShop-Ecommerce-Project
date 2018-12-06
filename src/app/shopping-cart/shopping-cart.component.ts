import { AngularFireObject } from '@angular/fire/database';
import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  shoppingCartItemCount:number;
  cart$;

  constructor(private shoppingcartService: ShoppingCartService) { }

  async ngOnInit() {
   this.cart$ = await this.shoppingcartService.getCart();
  }

  clearCart(){
    this.shoppingcartService.clearCart();
  }
}
