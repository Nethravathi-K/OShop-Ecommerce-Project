import { AngularFireObject } from '@angular/fire/database';
import { ShoppingCart } from './../models/shopping-cart';
import { AppUser } from './../models/app-user';
import { AuthService } from './../auth.service';
import { Component, OnInit} from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit{
 
  appUser:AppUser;
  cart$;

  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService) {
    
   }

  logout(){
    this.auth.logout();
  }

  async ngOnInit(){
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);

    this.cart$ =  await this.shoppingCartService.getCart();

  }

}
