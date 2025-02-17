import { Component, inject } from '@angular/core';
import{AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { AuthService } from '../../core/services/autu/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,TranslatePipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  messageError:string='';
  success:string='';
// inject for auth Service
  private readonly authService=inject(AuthService);

// inject for auth Service
  private readonly router=inject(Router);



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

  loading:boolean=false;
  // submit action
  submitForm():void{
    this.loading=true;
    console.log(this.registerForm)
    if(this.registerForm.valid){
      this.authService.getSingUp(this.registerForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          if(res.message==="success"){

          setTimeout(() => {
              // navigat path login
              this.router.navigate(['/login'])
            
          }, 700);
        }
          this.loading=false;
          this.success=res.message;
          Swal.fire({
            icon: "success",
            title: "Success Operation",
            text: this.success,
          });

          
        },
        error:(err:HttpErrorResponse)=>{
          console.log(err);
          // show message for user
          this.messageError=err.error.message;

          Swal.fire({
            icon: "error",
            title: "Error...",
            text: this.messageError,
          });
          
          this.loading=false;
          
        }
      })
    }else{
      this.registerForm.markAllAsTouched();
    }
  }

}
