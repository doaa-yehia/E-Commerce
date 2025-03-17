import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { BrandsService } from '../../core/services/brands/brands.service';
import { ISubCategory } from '../../shared/interfaces/isub-category';
import { ICategory } from '../../shared/interfaces/icategory';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-brands',
  imports: [TranslatePipe],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit,OnDestroy {

  private readonly brandsService = inject(BrandsService)

  brandsList: WritableSignal<ICategory[]> = signal([])

  brandItem: WritableSignal<ICategory> = signal({} as ICategory)

  isModelOpen = signal(false);

  $sub:Subject<void>=new Subject();


  toggleModel() {
    this.isModelOpen.set(!this.isModelOpen());
  }
  ngOnInit(): void {
    this.getAllBrands();
  }
  getAllBrands(): void {
    this.brandsService.getAllBrandsWithSharReplay().pipe(takeUntil(this.$sub)).subscribe({
      next: (res) => {
        this.brandsList.set(res.data);

      }
    })
  }
  
  getBrand(id: string) {
    console.log(id);
    this.brandsService.getSpecificBrand(id).pipe(takeUntil(this.$sub)).subscribe({
      next: (res) => {
        this.brandItem.set(res.data)
       
      }
    })

  }
 

  ngOnDestroy(): void {
    this.$sub.next();
    this.$sub.unsubscribe();
  }

}
