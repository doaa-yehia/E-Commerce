import { Component, computed, HostListener, inject, input, InputSignal, OnDestroy, OnInit, PLATFORM_ID, Signal, signal, WritableSignal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/autu/auth.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/myTraslate/my-translate.service';
import { CartService } from '../../core/services/cart/cart.service';
import { Subject, takeUntil } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
// import { MyTranslateService } from '../../core/services/myTraslate/my-translate.service';

@Component({
  selector: 'app-navbar',
  imports: [ RouterLink,RouterLinkActive,TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit,OnDestroy {

  readonly _AuthService=inject(AuthService);
  private readonly myTranslateService=inject(MyTranslateService); 
  private readonly translateService=inject(TranslateService);
  private readonly cartService=inject(CartService);
  private readonly platForm_ID = inject(PLATFORM_ID);


  isMain:InputSignal<boolean>=input(true);

  isMenuOpen:WritableSignal<boolean>=signal(false);
  isDropOpen:WritableSignal<boolean>=signal(false);
  cartNumber:Signal<number>=computed(()=>this.cartService.cartItemsNum());
  $sub:Subject<void>=new Subject();


  ngOnInit(): void {
    if (isPlatformBrowser(this.platForm_ID)) {
      if (localStorage.getItem('userToken')) {
        
        this.cartService.getLoggedUseCart().pipe(takeUntil(this.$sub)).subscribe({
          next:(res)=>{
            this.cartService.cartItemsNum.set(res.numOfCartItems);
          }
        })
        
      }
      
    }
    
  }

  toggelMenu(){
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  toggelDrop(){
    this.isDropOpen.set(!this.isDropOpen());
  }

  scroll:WritableSignal<boolean>=signal(true);
  @HostListener('window:scroll') onScroll(){
    if (scrollY>20) {
      this.scroll.set(false);
    }else{
      this.scroll.set(true);

    }
  }

  change(lang:string):void{
    this.myTranslateService.changLangTranslate(lang);
  }

  currentLang(lang:string):boolean{
    return this.translateService.currentLang===lang;
  }
  ngOnDestroy(): void {
    this.$sub.next();
    this.$sub.unsubscribe();
  }

}
