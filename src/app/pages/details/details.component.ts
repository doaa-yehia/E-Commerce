import { Component, computed, inject, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@ngx-translate/core';
import { WichListService } from '../../core/services/wichList/wich-list.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-details',
  imports: [CarouselModule,CurrencyPipe,TranslatePipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  
  private readonly _ActivatedRoute=inject(ActivatedRoute);
  private readonly _ProductsService=inject(ProductsService)
  private readonly cartService=inject(CartService)
  private readonly _ToastrService=inject(ToastrService)
  private readonly wichListService=inject(WichListService)


  productDetails:WritableSignal<IProduct>=signal ({} as IProduct);
  wishList: Signal<string[]>=computed( ()=>this.wichListService.wishListIds())
  
  $sub:Subject<void>=new Subject();


  productImages: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-chevron-left"></i>', '<i class="fa-solid fa-chevron-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 2
      },
      940: {
        items: 2
      }
    },
    nav: true
  }

  ngOnInit(): void {
    let productId:string|null;
    this._ActivatedRoute.paramMap.subscribe({
      next:(p)=>{
        // have id of product
        productId=p.get('id');
        // console.log(productId);
        //api logic
        this._ProductsService.getSpecificProducts(productId).subscribe({
          next:(res)=>{
            console.log(res.data);
            this.productDetails.set(res.data);
          }
        })
        


      }
    })
  }

  addToCart(id:string){
    this.cartService.AddProdutCart(id).pipe(takeUntil(this.$sub)).subscribe({
      next:(res)=>{
        console.log(res);
        this.cartService.cartItemsNum.set(res.numOfCartItems);
        this._ToastrService.success(res.message,"added to Cart")
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

    getwishList():void{
    this.wichListService.getLoggedWishList().pipe(takeUntil(this.$sub)).subscribe({
      next:(res)=>{
        this.wichListService.wishListIds.set(res.data.map((product:IProduct)=>{
          return product._id;
        }))
        console.log(this.wishList());
        
      }
    })
  }
  handelAddToWishList(id:string):void{
    this.wichListService.addToWishList(id).pipe(takeUntil(this.$sub)).subscribe({
      next:(res)=>{
        this._ToastrService.success(res.message,'Added To WishList');
        this.wichListService.wishListIds.set(res.data);
        console.log(this.wishList());
        
      }
    })
  }

  handelDeleteFromWishList(id:string):void{
    this.wichListService.removeFromWishList(id).pipe(takeUntil(this.$sub)).subscribe({
      next:(res)=>{
        this._ToastrService.success(res.message,'deleted from WishList');
       this.getwishList();
      }
    })
  }

  ngOnDestroy(): void {
    this.$sub.next();
    this.$sub.subscribe();
  }
}
