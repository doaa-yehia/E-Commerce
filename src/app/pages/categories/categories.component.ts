import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{
  
  private readonly _ActivatedRoute=inject(ActivatedRoute)
  private readonly ProductsService=inject(ProductsService)

  categoryProducts:IProduct[]=[];
  ngOnInit(): void {
    let id:any='';
    this._ActivatedRoute.paramMap.subscribe({
      next:(p)=>{
        id=p.get('id');
        //logic to get spasific category
        this.ProductsService.getAllProducts().subscribe({
          next:(res)=>{
            console.log(res.data);
            this.categoryProducts=res.data.filter((item:IProduct)=>item.category._id==id)
            console.log(this.categoryProducts);
            
          }
        })
      }
    })
  }

  

}
