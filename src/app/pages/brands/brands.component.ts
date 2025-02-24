import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { BrandsService } from '../../core/services/brands/brands.service';
import { ISubCategory } from '../../shared/interfaces/isub-category';
import { ICategory } from '../../shared/interfaces/icategory';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-brands',
  imports: [TranslatePipe],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {

  private readonly brandsService = inject(BrandsService)

  brandsList: WritableSignal<ICategory[]> = signal([])

  brandItem: WritableSignal<ICategory> = signal({} as ICategory)

  isModelOpen = signal(false);
  toggleModel() {
    this.isModelOpen.set(!this.isModelOpen());
  }
  ngOnInit(): void {
    this.getAllBrands();
  }
  getAllBrands(): void {
    this.brandsService.getAllBrands().subscribe({
      next: (res) => {
        console.log(res);
        this.brandsList.set(res.data);

      }
    })
  }
  
  getBrand(id: string) {
    console.log(id);
    this.brandsService.getSpecificBrand(id).subscribe({
      next: (res) => {
        console.log(res.data);
        this.brandItem.set(res.data)
        console.log(this.brandItem());
        // this.getSawl();
       
      }
    })

  }
  getSawl():void{
    Swal.fire({
      title: "<strong>HTML <u>example</u></strong>",
      icon: "info",
      html: `
         <div class="flex items-center content-center space-x-3">
            <div>
                <h3 class="text-xl text-green-600"> {{brandItem().name}} </h3>
            </div>
            <img [src]="brandItem().image" [alt]="brandItem().name">
        </div>
       
      `,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: `
        <i class="fa fa-thumbs-up"></i> Great!
      `,
      confirmButtonAriaLabel: "Thumbs up, great!",
      cancelButtonText: `
        <i class="fa fa-thumbs-down"></i>
      `,
      cancelButtonAriaLabel: "Thumbs down"
    });
  }

}
