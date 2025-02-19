import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@ngx-translate/core';

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
  

  productDetails:IProduct|null=null;

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
            this.productDetails=res.data;
          }
        })
        


      }
    })
  }

  addToCart(id:string){
    this.cartService.AddProdutCart(id).subscribe({
      next:(res)=>{
        console.log(res);
        this._ToastrService.success(res.message,"added to Cart")
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

}
