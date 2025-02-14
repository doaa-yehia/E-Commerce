import { RouterLink } from '@angular/router';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategory } from '../../shared/interfaces/icategory';
import { IProduct } from '../../shared/interfaces/iproduct';
import { ProductsService } from './../../core/services/products/products.service';
import { Component, inject, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-home',
  imports: [CarouselModule,RouterLink,CurrencyPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  mainSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
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
  products:IProduct[]=[];
  categories:ICategory[]=[];
  
  ngOnInit(): void {
    this.getProductsData();
    this.getCategoriesData();

  }

  addToCart(id:string){
    this.cartService.AddProdutCart(id).subscribe({
      next:(res)=>{
        console.log(res);
        this._ToastrService.success(res.message,"added Cart")
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  getProductsData():void{
    this.productsService.getAllProducts().subscribe({
      next:(res)=>{
        this.products=res.data;
     console.log(this.products);
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  getCategoriesData():void{
    this.categoriesService.getAllCategories().subscribe({
      next:(res)=>{
        this.categories=res.data
        console.log(this.categories);
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  
}
