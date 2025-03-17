import { Component, inject, OnDestroy, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { ICart } from '../../shared/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe,SweetAlert2Module,RouterLink,TranslatePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit,OnDestroy {

  ngOnInit(): void {
    this.getCartData();
  }
  private readonly cartService = inject(CartService);
  private readonly platForm_ID = inject(PLATFORM_ID);

  cartDetails:WritableSignal<ICart>=signal({} as ICart) ;
  
  $sub:Subject<void>=new Subject();

 
  getCartData(): void {
   
    this.cartService.getLoggedUseCart().pipe(takeUntil(this.$sub)).subscribe({
      next: (res) => {
        this.cartDetails.set(res.data);
      }
    });
  };

  removeFromCart(id:string):void{
    console.log(id);
    this.cartService.removeSpacificProdCart(id).pipe(takeUntil(this.$sub)).subscribe({
      next:(res)=>{
        Swal.fire('Success','The Operation Was Successful','success' )
        this.cartDetails.set(res.data);
        this.cartService.cartItemsNum.set(res.numOfCartItems);
        
      }
    })
    

  };

  updateItem(id:string,count:number):void{
    this.cartService.apdateCartQuantity(id,count).pipe(takeUntil(this.$sub)).subscribe({
      next:(res)=>{
        this.cartDetails.set(res.data)
        
      }
    })
  };

  daleteCart():void{
    console.log('hello');
    this.cartService.clearCart().pipe(takeUntil(this.$sub)).subscribe({
      next:(res)=>{
        
        
        if (res.message==="success") {
          
          Swal.fire('Success','The Operation Was Successful','success' )
          this.cartDetails.set({} as ICart);
          this.cartService.cartItemsNum.set(0);

        }

      }
    })
    
  };

  ngOnDestroy(): void {
    this.$sub.next();
    this.$sub.unsubscribe();
  };


}

