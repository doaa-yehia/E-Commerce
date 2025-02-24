import { WichListService } from './../../core/services/wichList/wich-list.service';
import { Component, computed, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';

@Component({
  selector: 'app-products',
  imports: [RouterLink, CurrencyPipe,TranslatePipe,FormsModule,SearchPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
 
    private readonly productsService=inject(ProductsService);
    private readonly cartService=inject(CartService)
    private readonly _ToastrService=inject(ToastrService)
    private readonly wichListService=inject(WichListService);

    // products:WritableSignal<IProduct[]>=signal([]);
    products:IProduct[]=[];

    wishList: Signal<string[]>=computed( ()=>this.wichListService.wishListIds())
    
    text:WritableSignal<string>=signal("")

    ngOnInit(): void {
      this.getProductsData();
      this.getwishList();
    }

    getProductsData():void{
      this.productsService.getAllProducts().subscribe({
        next:(res)=>{
          this.products=res.data;
       console.log(res.data);
          
        }
      })
    }

    addToCart(id:string){
      this.cartService.AddProdutCart(id).subscribe({
        next:(res)=>{
          console.log(res);
          this._ToastrService.success(res.message,"added to Cart")
        }
      })
    }
    getwishList():void{
      this.wichListService.getLoggedWishList().subscribe({
        next:(res)=>{
          this.wichListService.wishListIds.set(res.data.map((product:IProduct)=>{
            return product._id;
          }))
          console.log(this.wishList());
          
        }
      })
    }
    handelAddToWishList(id:string):void{
      this.wichListService.addToWishList(id).subscribe({
        next:(res)=>{
          this._ToastrService.success(res.message,'Added To WishList');
          this.wichListService.wishListIds.set(res.data);
          console.log(this.wishList());
          
        }
      })
    }
  
    handelDeleteFromWishList(id:string):void{
      this.wichListService.removeFromWishList(id).subscribe({
        next:(res)=>{
          this._ToastrService.success(res.message,'deleted from WishList');
         this.getwishList();
        }
      })
    }
  

}
