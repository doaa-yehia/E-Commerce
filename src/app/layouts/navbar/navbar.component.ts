import { Component, HostListener, inject, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/autu/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [ RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  readonly _AuthService=inject(AuthService);

  isMain=input<boolean>();
  scroll:boolean=true;
  @HostListener('window:scroll') onScroll(){
    if (scrollY>20) {
      this.scroll=false;
    }else{
      this.scroll=true;

    }
  }
}
