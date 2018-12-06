import { switchMap } from 'rxjs/operators';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {



  ngOnInit() {
  }
  orders$;
  
  constructor(
    private authService: AuthService,
    private orderService: OrderService) { 

    // this.orders$ = authService.user$.switchMap(u => orderService.getOrdersByUser(u.uid));
  }

}
