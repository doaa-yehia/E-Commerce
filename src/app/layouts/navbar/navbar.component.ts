import { Component, computed, HostListener, inject, input, InputSignal, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/autu/auth.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/myTraslate/my-translate.service';
import { CartService } from '../../core/services/cart/cart.service';
// import { MyTranslateService } from '../../core/services/myTraslate/my-translate.service';

@Component({
  selector: 'app-navbar',
  imports: [ RouterLink,RouterLinkActive,TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  readonly _AuthService=inject(AuthService);
  private readonly myTranslateService=inject(MyTranslateService); 
  private readonly translateService=inject(TranslateService);
  private readonly cartService=inject(CartService);


  isMain:InputSignal<boolean>=input<boolean>(true);

  isMenuOpen:WritableSignal<boolean>=signal(false);
  isDropOpen:WritableSignal<boolean>=signal(false);
  cartNumber:Signal<number>=computed(()=>this.cartService.cartItemsNum());

  ngOnInit(): void {
    // this.cartService.cartItemsNum.subscribe({
    //   next:(value)=>{
    //     this.cartNumber=value;
    //   }
    // });
    this.cartService.getLoggedUseCart().subscribe({
      next:(res)=>{
        this.cartService.cartItemsNum.set(res.numOfCartItems);
      }
    })
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

}
