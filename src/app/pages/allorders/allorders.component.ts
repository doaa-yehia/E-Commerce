import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { OrderService } from '../../core/services/order/order.service';
import { AuthService } from '../../core/services/autu/auth.service';
import { IuserOrder } from '../../shared/interfaces/iuser-order';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/services/cart/cart.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-allorders',
  imports: [CurrencyPipe,TranslatePipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit {
  
  private readonly orderService=inject(OrderService);
  private readonly authService=inject(AuthService);
  private readonly cartService = inject(CartService)
  
  id:string='';
  allOrder:IuserOrder[]=[]
  ngOnInit(): void {
    this.authService.getUserData();
    this.id=this.authService.userData.id;
    this.getOrders();
    
  }
  
  getOrders():void{
    this.orderService.getUserOrder(this.id).subscribe({
      next:(res)=>{
        console.log(res);
        this.allOrder=res;
      }
    })
  }
  // daleteCart():void{
  //     console.log('hello');
  //     this.cartService.clearCart().subscribe({
  //       next:(res)=>{
  //         console.log(res);
          
  //       },
  //       error:(err)=>{
  //         console.log(err);
          
  //       }
  //     })
      
  //   }

  // ngOnDestroy(): void {
  //   // this.daleteCart();
  // }
}
