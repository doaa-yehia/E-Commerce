import { SubCategoriesService } from '../../core/services/subCategories/sub-categories.service';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { ICategory } from '../../shared/interfaces/icategory';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ISubCategory } from '../../shared/interfaces/isub-category';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-categories',
  imports: [TranslatePipe],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{
  
  private readonly _ActivatedRoute=inject(ActivatedRoute)
  private readonly ProductsService=inject(ProductsService)

  private readonly categoriesService=inject(CategoriesService);
  private readonly subCategoriesService=inject(SubCategoriesService)

  categoryList:WritableSignal<ICategory[]>=signal([]);
  subCategoryList:WritableSignal<ISubCategory[]>=signal([]);
  categoryName:WritableSignal<string>=signal("");
  subOpen:WritableSignal<boolean>=signal(false)
  ngOnInit(): void {
    // let id:any='';
    // this._ActivatedRoute.paramMap.subscribe({
    //   next:(p)=>{
    //     id=p.get('id');
    //     //logic to get spasific category
    //     this.ProductsService.getAllProducts().subscribe({
    //       next:(res)=>{
    //         console.log(res.data);
    //         this.categoryProducts=res.data.filter((item:IProduct)=>item.category._id==id)
    //         console.log(this.categoryProducts);
            
    //       }
    //     })
    //   }
    // })
    this.getAllCategory();

  }
  getAllCategory():void{
this.categoriesService.getAllCategories().subscribe({
  next:(res)=>{
    console.log(res);
    this.categoryList.set(res.data);
    console.log(this.categoryList());
    
    
  }
})
  }

  getSubCategory(id:string,name:string):void{
    this.categoryName.set(name);
    this.subOpen.set(true);

    this.subCategoriesService.getAllSubCategoryOnCategory(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.subCategoryList.set(res.data);
        console.log(this.subCategoryList());

      }
    })

  }

  getAllSubCategory(){

  }

  

}
