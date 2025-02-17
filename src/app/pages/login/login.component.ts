import { Component, inject } from '@angular/core';
import{AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { AuthService } from '../../core/services/autu/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink,TranslatePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  messageError:string='';
  success:string='';
// inject for auth Service
  private readonly authService=inject(AuthService);

// inject for auth Service
  private readonly router=inject(Router);



  // logIn Form
  loginForm:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z]\w{5,}$/)]),
  
  }

  );


  loading:boolean=false;
  // submit action
  submitForm():void{
    this.loading=true;
    console.log(this.loginForm)
    if(this.loginForm.valid){
      this.authService.getSingIn(this.loginForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          if(res.message==="success"){

          setTimeout(() => {
              // save token in storage
              localStorage.setItem('userToken',res.token);

              // decode The Token
              this.authService.getUserData();

              // navigat path login
              this.router.navigate(['/home'])
            
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
                      title: "Oops...",
                      text: this.messageError,
                    });
          this.loading=false;
          
        }
      })
    }
  }
}
