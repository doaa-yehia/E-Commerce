import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-products',
  imports: [RouterLink, CurrencyPipe,TranslatePipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
 
    private readonly productsService=inject(ProductsService);
    private readonly cartService=inject(CartService)
    private readonly _ToastrService=inject(ToastrService)
      
    products:IProduct[]=[];
    
    ngOnInit(): void {
      this.getProductsData();
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
  

}
