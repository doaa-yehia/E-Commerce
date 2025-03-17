import { WichListService } from './../../core/services/wichList/wich-list.service';
import { Component, computed, inject, OnDestroy, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-products',
  imports: [RouterLink, CurrencyPipe,TranslatePipe,FormsModule,SearchPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit,OnDestroy {
 
    private readonly productsService=inject(ProductsService);
    private readonly cartService=inject(CartService)
    private readonly _ToastrService=inject(ToastrService)
    private readonly wichListService=inject(WichListService);

    products:WritableSignal<IProduct[]>=signal([] );

    wishList: Signal<string[]>=computed( ()=>this.wichListService.wishListIds())
    
    text:WritableSignal<string>=signal("")

    $sub:Subject<void>=new Subject();

    ngOnInit(): void {
      this.getProductsData();
      this.haveWishListIds();
    }

    getProductsData():void{
      this.productsService.getAllProductsWithSareRePlay().pipe(takeUntil(this.$sub)).subscribe({
        next:(res)=>{
          this.products.set(res.data);
          
        }
      })
    }

    addToCart(id:string){
      this.cartService.AddProdutCart(id).pipe(takeUntil(this.$sub)).subscribe({
        next:(res)=>{
          console.log(res);
          this._ToastrService.success(res.message,"added to Cart")
          this.cartService.cartItemsNum.set(res.numOfCartItems);
        }
      })
    }

    // to have the wishList IDs
    haveWishListIds():void{
      this.wichListService.getWishListIDs().pipe(takeUntil(this.$sub)).subscribe({
        next:(res)=>{
          this.wichListService.wishListIds.set(res)
        }
      })
    }

    handelAddToWishList(id:string):void{
      this.wichListService.addToWishList(id).pipe(takeUntil(this.$sub)).subscribe({
        next:(res)=>{
          this._ToastrService.success(res.message,'Added To WishList');
          this.wichListService.wishListIds.set(res.data);
          
        }
      })
    }
  
    handelDeleteFromWishList(id:string):void{
      this.wichListService.removeFromWishList(id).pipe(takeUntil(this.$sub)).subscribe({
        next:(res)=>{
          this._ToastrService.success(res.message,'deleted from WishList');
         this.haveWishListIds();
        }
      })
    }
  
    ngOnDestroy(): void {
      this.$sub.next();
      this.$sub.unsubscribe();
    }

}
