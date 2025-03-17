import { map, Subject, Subscription, takeUntil } from 'rxjs';
import { IProduct } from './../../shared/interfaces/iproduct';
import { RouterLink } from '@angular/router';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategory } from '../../shared/interfaces/icategory';
import { ProductsService } from './../../core/services/products/products.service';
import { Component, computed, inject, Input, OnDestroy, OnInit, Signal, signal, ViewChild, WritableSignal } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';
import { WichListService } from '../../core/services/wichList/wich-list.service';


@Component({
  selector: 'app-home',
  imports: [CarouselModule,RouterLink,CurrencyPipe,TranslatePipe,FormsModule,SearchPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit,OnDestroy {

  mainSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    rtl:true,
    dots: true,
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-chevron-left"></i>', '<i class="fa-solid fa-chevron-right"></i>'],
    items:1,
    nav: false
  }
  
  
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    dots: false,
    rtl:true,
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-chevron-left text-green-600 hover:text-white transition-all duration-300"></i>', '<i class="fa-solid fa-chevron-right text-green-600 hover:text-white transition-all duration-300"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: true
  }


  private readonly productsService=inject(ProductsService);
  private readonly categoriesService=inject(CategoriesService);
  private readonly cartService=inject(CartService);
  private readonly _ToastrService=inject(ToastrService)
  private readonly wichListService=inject(WichListService);

  products:WritableSignal<IProduct[]>=signal([]);
  categories:WritableSignal<ICategory[]>=signal([]);
  text:WritableSignal<string>=signal("");
  wishList:Signal<string[]>=computed( ()=>this.wichListService.wishListIds() );
  
  $sub:Subject<void>=new Subject();

  ngOnInit(): void {
    this.getProductsData();
    this.getCategoriesData();
    this.haveWishListIds();
  }


  addToCart(id:string){
    this.cartService.AddProdutCart(id).pipe(takeUntil(this.$sub)).subscribe({
      next:(res)=>{
        this._ToastrService.success(res.message,"added to Cart");
        this.cartService.cartItemsNum.set(res.numOfCartItems);
        
      }
    })
  }

  getProductsData():void{
    this.productsService.getAllProductsWithSareRePlay().pipe(takeUntil(this.$sub)).subscribe({
      next:(res)=>{
        this.products.set(res.data);
        
      }
    })
  }

  getCategoriesData():void{
    this.categoriesService.getAllCategoriesWithShareReblay().pipe(takeUntil(this.$sub)).subscribe({
      next:(res)=>{
        this.categories.set(res.data);

        
      }
    })
  }


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
