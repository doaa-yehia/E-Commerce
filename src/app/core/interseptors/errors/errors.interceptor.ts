import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
   
  const toastrService=inject(ToastrService)
  
  return next(req).pipe( catchError( (err)=>{
    if(!req.url.includes('auth')){
      toastrService.error(err.error.message,'FreshCart')

    }else if(req.url.includes('verifyResetCode')){
      toastrService.error(err.error.message,'FreshCart')

    }else if(req.url.includes('auth')){
       Swal.fire({
          icon: "error",
          title: "FreshCart...",
          text: err.error.message,
          });
    }

    return throwError( ()=> err )
  } ) );
};
