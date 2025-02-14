import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/autu/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget',
  imports: [ReactiveFormsModule],
  templateUrl: './forget.component.html',
  styleUrl: './forget.component.scss'
})
export class ForgetComponent {
  private readonly _AuthService=inject(AuthService);
  private readonly _Router=inject(Router);

  step:number=1;
  loading:boolean=false;
  curentEmail:string='';

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
    
    this.loading=true;
    this._AuthService.getEmailVerify(this.verifyEmail.value).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.statusMsg==="success"){
          this.step++;
        }
        
        this.loading=false;
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
  
  submitCode():void{
    this.loading=true;
    this._AuthService.getCodeVerify(this.verifyCode.value).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.status==="Success"){
          this.step++;
        }
        this.loading=false;
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  submitVerifyRebassword():void{
    this.loading=true;
    this._AuthService.getRepassword(this.resetPassword.value).subscribe({
      next:(res)=>{
        console.log(res);
        // save token in localStorage
        localStorage.setItem('userToken',res.token);
        
        // decode the token
        this._AuthService.getUserData();

        // navigate to login page
        this._Router.navigate(['/home']);
        
        this.loading=false;
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }


}
