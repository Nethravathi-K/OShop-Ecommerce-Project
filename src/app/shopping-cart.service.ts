import { take, map } from 'rxjs/operators';
import { AngularFireDatabase, DatabaseSnapshot } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Product } from './models/product';
import { ShoppingCart } from './models/shopping-cart';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { 
  }

  private create(){
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart():Promise<Observable<ShoppingCart>>{
    let cartId = await this.getOrCreateCartId();
    let cart =  this.db.object('/shopping-carts/' + cartId).snapshotChanges().pipe(
      map(actions => {
        const items = actions.payload.val().items;
        return  new ShoppingCart(items);
      })
      );
    return cart;
  }

  addToCart(product: Product){
    this.updateItem(product, 1);
  }

  removeFromCart(product){
    this.updateItem(product, -1);
  }

  async clearCart(){
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private getItem(cartId: string, productId: string){
   return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    
    if(cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private async updateItem(product: Product, change:number){
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);

    item$.snapshotChanges().pipe(take(1)).subscribe((item:any) => {
    if(item.payload.exists() )
    item$.update({
      title:product.title,
      imageUrl:product.imageUrl,
      price:product.price,
      quantity: (item.payload.val().quantity + 0) + change
    });
    else item$.set({product: product, quantity: 1});
    });
  }

}
