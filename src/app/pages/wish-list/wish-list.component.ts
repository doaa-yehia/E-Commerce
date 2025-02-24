import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { WichListService } from '../../core/services/wichList/wich-list.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CurrencyPipe } from '@angular/common';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wish-list',
  imports: [TranslatePipe,CurrencyPipe,SweetAlert2Module],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent implements OnInit {
  
  private readonly wichListService=inject(WichListService);
  private readonly cartService=inject(CartService);
  private readonly toastrService=inject(ToastrService);

  wishListProducts:WritableSignal<IProduct[]>=signal([]);

  ngOnInit(): void {
    this.getAllwishList();
  }

  getAllwishList():void{
    this.wichListService.getLoggedWishList().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.wishListProducts.set(res.data);
        
      }
    })
  }

  deleteFromWishList(id:string):void{
    this.wichListService.removeFromWishList(id).subscribe({
      next:(res)=>{
        if(res.status==="success"){
          Swal.fire('Success',res.message,'success' );
          this.getAllwishList();
        }
      }
    })
  }

  addToCart(id:string){
    this.cartService.AddProdutCart(id).subscribe({
      next:(res)=>{
        if (res.status==='success') {
          this.toastrService.success(res.message,"added to Cart");
          this.cartService.cartItemsNum.set(res.numOfCartItems);
        }

      }
    })
  }


  

}
