import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../core/services/order/order.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule,TranslatePipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  
  private readonly _ActivatedRoute=inject(ActivatedRoute);
  private readonly _OrderService=inject(OrderService);

  cartId:string='';


  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((param)=>{
      this.cartId=param.get('id') !;
      
    })
  }
  checkOutForm:FormGroup=new FormGroup({
    details:new FormControl(null,Validators.required),
    phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[0-2,5]{1}[0-9]{8}$/)]),
    city:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z|a-z]{2,10} ?[A-Z|a-z]{0,10}$/)]),
  });
  
  checkOutSession():void{
    this._OrderService.
    getCheckOutSession(this.cartId,this.checkOutForm.value)
    .subscribe({
      next:(res)=>{
        console.log(res);
        if(res.status==="success"){
          // open url stripe
          open(res.session.url,'_self')
        }
        
      }
    })
  }

  submitForm():void{
    console.log(this.checkOutForm.value);
    this.checkOutSession();
    
  }
}
