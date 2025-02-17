import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { ICart } from '../../shared/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';


@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe,SweetAlert2Module,RouterLink,TranslatePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  ngOnInit(): void {
    this.getCartData();
  }
  private readonly cartService = inject(CartService)

  cartDetails:ICart={} as ICart;
  getCartData(): void {
    this.cartService.getLoggedUseCart().subscribe({
      next: (res) => {
        console.log(res.data);
        this.cartDetails=res.data;
      }
    })
  };

  removeFromCart(id:string):void{
    console.log(id);
    this.cartService.removeSpacificProdCart(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.cartDetails=res.data;
        
      }
    })
    

  };

  updateItem(id:string,count:number):void{
    this.cartService.apdateCartQuantity(id,count).subscribe({
      next:(res)=>{
        console.log(res);
        this.cartDetails=res.data
        
      }
    })
  };
  daleteCart():void{
    console.log('hello');
    this.cartService.clearCart().subscribe({
      next:(res)=>{
        console.log(res);
        
        
        if (res.message==="success") {
          
          Swal.fire('Success','The Operation Was Successful','success' )
          this.cartDetails={} as ICart;
        }

      }
    })
    
  }

}

