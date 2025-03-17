import { Component, inject, OnDestroy, signal, WritableSignal } from '@angular/core';
import{AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { AuthService } from '../../core/services/autu/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { TranslatePipe } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink,TranslatePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy {
  
// inject for auth Service
  private readonly authService=inject(AuthService);

// inject for auth Service
  private readonly router=inject(Router);

  loading:WritableSignal<boolean>=signal(false);

  $sub:Subject<void>=new Subject();


  // logIn Form
  loginForm:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z]\w{5,}$/)]),
  
  }

  );
 

  // submit action
  submitForm():void{

    if(this.loginForm.valid){
      this.loading.set(true);

      this.authService.getSingIn(this.loginForm.value).pipe(takeUntil(this.$sub)).subscribe({
        next:(res)=>{
          
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
          this.loading.set(false);
        Swal.fire({
                    icon: "success",
                    title: "Success Operation",
                    text: res.message,
                  });
          
        },
        error:()=>{

          this.loading.set(false);
  
        }
        
      })

    }

  }

  ngOnDestroy(): void {
    this.$sub.next();
    this.$sub.subscribe();
  }
}
