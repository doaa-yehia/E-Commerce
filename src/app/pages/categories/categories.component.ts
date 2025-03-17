import { SubCategoriesService } from '../../core/services/subCategories/sub-categories.service';
import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { ICategory } from '../../shared/interfaces/icategory';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ISubCategory } from '../../shared/interfaces/isub-category';
import { TranslatePipe } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-categories',
  imports: [TranslatePipe],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit,OnDestroy{
  
  private readonly categoriesService=inject(CategoriesService);
  private readonly subCategoriesService=inject(SubCategoriesService)

  categoryList:WritableSignal<ICategory[]>=signal([]);
  subCategoryList:WritableSignal<ISubCategory[]>=signal([]);
  categoryName:WritableSignal<string>=signal("");
  subOpen:WritableSignal<boolean>=signal(false)
 
  $sub:Subject<void>=new Subject();

  ngOnInit(): void {
   
    this.getAllCategory();

  }
  getAllCategory():void{
    this.categoriesService.getAllCategoriesWithShareReblay().pipe(takeUntil(this.$sub)).subscribe({
      next:(res)=>{
        this.categoryList.set(res.data);
        
        
  }
})
  }

  getSubCategory(id:string,name:string):void{
    this.categoryName.set(name);
    this.subOpen.set(true);

    this.subCategoriesService.getAllSubCategoryOnCategory(id).pipe(takeUntil(this.$sub)).subscribe({
      next:(res)=>{
        this.subCategoryList.set(res.data);

      }
    })

  }

  ngOnDestroy(): void {
    this.$sub.next();
    this.$sub.unsubscribe();
  }

  

}
