import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../core/services/order/order.service';
import { TranslatePipe } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule,TranslatePipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit,OnDestroy {
  
  private readonly _ActivatedRoute=inject(ActivatedRoute);
  private readonly _OrderService=inject(OrderService);
  private readonly toastrService=inject(ToastrService);


  $sub:Subject<void>=new Subject();

  cartId:WritableSignal<string>=signal('');
  loading:WritableSignal<boolean>=signal(false);


  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((param)=>{
      this.cartId.set(param.get('id') !);
      
    })
  }
  checkOutForm:FormGroup=new FormGroup({
    details:new FormControl(null,Validators.required),
    phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[0-2,5]{1}[0-9]{8}$/)]),
    city:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z|a-z]{2,10} ?[A-Z|a-z]{0,10}$/)]),
  });
  
  checkOutSession():void{
    this._OrderService.
    getCheckOutSession(this.cartId(),this.checkOutForm.value).pipe(takeUntil(this.$sub))
    .subscribe({
      next:(res)=>{
        if(res.status==="success"){
          this.loading.set(false);

          this.toastrService.success(res.status,'Fresh Cart');
          
          // open url stripe
          open(res.session.url,'_self')
        }
        
      },
      error:()=>{
        this.loading.set(false);

      }
    })
  }

  submitForm():void{
    if(this.checkOutForm.valid){
      this.loading.set(true);
      this.checkOutSession();
      
    }else{
      this.checkOutForm.markAllAsTouched();
    }
    
  }

  ngOnDestroy(): void {
    this.$sub.next();
    this.$sub.subscribe();
  }
}



