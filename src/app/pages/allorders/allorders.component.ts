import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { OrderService } from '../../core/services/order/order.service';
import { AuthService } from '../../core/services/autu/auth.service';
import { IuserOrder } from '../../shared/interfaces/iuser-order';
import { CurrencyPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-allorders',
  imports: [CurrencyPipe,TranslatePipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit,OnDestroy {
  
  private readonly orderService=inject(OrderService);
  private readonly authService=inject(AuthService);
  
  id:WritableSignal<string>=signal('');
  allOrder:WritableSignal<IuserOrder[]>=signal([]);
  $sub:Subject<void>=new Subject();

  
  ngOnInit(): void {
    this.authService.getUserData();
    this.id.set(this.authService.userData.id);
    this.getOrders();
    
  }
  
  getOrders():void{
    this.orderService.getUserOrder(this.id()).pipe(takeUntil(this.$sub)).subscribe({
      next:(res)=>{
        console.log(res);
        this.allOrder.set(res);
      }
    })
  }
  
  ngOnDestroy(): void {
    this.$sub.next();
    this.$sub.subscribe();
  }
 
}
