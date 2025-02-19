import { Component, HostListener, inject, input, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/autu/auth.service';
import { TranslatePipe } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/myTraslate/my-translate.service';
// import { MyTranslateService } from '../../core/services/myTraslate/my-translate.service';

@Component({
  selector: 'app-navbar',
  imports: [ RouterLink,RouterLinkActive,TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  readonly _AuthService=inject(AuthService);
  private readonly myTranslateService=inject(MyTranslateService)  

  isMain=input<boolean>();
  isMenuOpen=signal(false);
  toggelMenu(){
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  isDropOpen=signal(false);
  toggelDrop(){
    this.isDropOpen.set(!this.isDropOpen());
  }

  scroll:boolean=true;
  @HostListener('window:scroll') onScroll(){
    if (scrollY>20) {
      this.scroll=false;
    }else{
      this.scroll=true;

    }
  }

  change(lang:string):void{
    this.myTranslateService.changLangTranslate(lang);
  }

}
