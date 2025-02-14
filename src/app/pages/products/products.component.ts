import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  // private readonly _ActivatedRoute=inject(ActivatedRoute)
  // private readonly ProductsService=inject(ProductsService)

  // categoryProducts:IProduct[]=[];
  
  // ngOnInit(): void {
  //   let id:any='';
  //   this._ActivatedRoute.paramMap.subscribe({
  //     next:(p)=>{
  //       id=p.get('id');
  //       //logic to get spasific category
  //       this.ProductsService.getAllProducts().subscribe({
  //         next:(res)=>{
  //           console.log(res.data);
  //           this.categoryProducts=res.data.filter((item:IProduct)=>item.category._id==id)
  //           console.log(this.categoryProducts);
            
  //         },
  //         error:(err)=>{
  //           console.log(err);
            
  //         }
  //       })
  //     }
  //   })
  // }
}
