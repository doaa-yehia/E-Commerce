import { Component, inject, OnDestroy, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/autu/auth.service';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-forget',
  imports: [ReactiveFormsModule,TranslatePipe],
  templateUrl: './forget.component.html',
  styleUrl: './forget.component.scss'
})
export class ForgetComponent implements OnDestroy {
  private readonly _AuthService=inject(AuthService);
  private readonly _Router=inject(Router);
  // private readonly toastrService=inject(ToastrService)
 
  step:WritableSignal<number>=signal(1);
  loading:WritableSignal<boolean>=signal(false);

    $sub:Subject<void>=new Subject();
  
  verifyEmail:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email])
  })

  verifyCode:FormGroup=new FormGroup({
    resetCode:new FormControl(null,[Validators.required,Validators.pattern(/^[0-9]{6}$/)])
  })

  resetPassword:FormGroup=new FormGroup({
    email:new FormControl(null),
    newPassword:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z]\w{5,}$/)]),

  })

  submitVerifyEmail():void{
    // get value of Email
    let emailValue=this.verifyEmail.get('email')?.value;
   
    // put value of email in the resetPassword form
    this.resetPassword.get('email')?.patchValue(emailValue);
    
    this.loading.set(true);
    this._AuthService.getEmailVerify(this.verifyEmail.value).pipe(takeUntil(this.$sub)).subscribe({
      next:(res)=>{
        if(res.statusMsg==="success"){
          this.step.update( (value)=>value + 1 );
        
        }
        
        this.loading.set(false);
      }
    })
  }
  
  submitCode():void{
    this.loading.set(true);
    this._AuthService.getCodeVerify(this.verifyCode.value).pipe(takeUntil(this.$sub)).subscribe({
      next:(res)=>{
        if(res.status==="Success"){
          this.step.update( (value)=>value + 1 );
        }
        this.loading.set(false);
        
      },
      error:()=>{

        this.loading.set(false);

      }

    })

  }

  submitVerifyRebassword():void{
    this.loading.set(true);
    this._AuthService.getRepassword(this.resetPassword.value).pipe(takeUntil(this.$sub)).subscribe({
      next:(res)=>{
        // save token in localStorage
        localStorage.setItem('userToken',res.token);
        
        // decode the token
        this._AuthService.getUserData();

        // navigate to login page
        this._Router.navigate(['/home']);
        
        this.loading.set(false);
      }
    })
  }


  ngOnDestroy(): void {
    this.$sub.next();
    this.$sub.subscribe();
  }

}
