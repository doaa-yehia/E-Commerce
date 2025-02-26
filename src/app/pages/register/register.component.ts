import { AfterViewChecked, Component, computed, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import{AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { AuthService } from '../../core/services/autu/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TranslatePipe } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,TranslatePipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy {

 
  
  // inject for auth Service
  private readonly authService=inject(AuthService);
  
  // inject for auth Service
  private readonly router=inject(Router);
  
  $sub:Subject<void>=new Subject();
  loading:WritableSignal<boolean>=signal(false);


  // register Form
  registerForm:FormGroup=new FormGroup({
    name:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z]\w{5,}$/)]),
    rePassword:new FormControl(null,[Validators.required]),
    phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[0-2,5]{1}[0-9]{8}$/)]),
    
  }
  // put custom Validation
  ,{validators:this.confirmPassword}
  // dont apper the errors until supmit
  // ,{updateOn:'submit'}
  );
  
  // custom Validation for confirm Password
  confirmPassword(group:AbstractControl){
    const password=group.get('password')?.value;
    const rePassword=group.get('rePassword')?.value;
    return password===rePassword?null:{misMatch:true};

  }

  // submit action
  submitForm():void{
    console.log(this.registerForm)
    if(this.registerForm.valid){
      this.loading.set(true);
      // this.disabled.set(false);

      this.authService.getSingUp(this.registerForm.value).pipe(takeUntil(this.$sub)).subscribe({
        next:(res)=>{
          console.log(res);
          if(res.message==="success"){

          setTimeout(() => {
              // navigat path login
              this.router.navigate(['/login'])
            
          }, 700);
        }
          this.loading.set(false);

          Swal.fire({
            icon: "success",
            title: "Success Operation",
            text: res.message,
          });

          
        },
        error:()=>{
          this.loading.set(false)
        }
        
        
      })
    }else{
      this.registerForm.markAllAsTouched();
    }
    

  }

  ngOnDestroy(): void {
    this.$sub.next();
    this.$sub.unsubscribe();
  }


}
