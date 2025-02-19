import { isPlatformBrowser } from '@angular/common';
import { inject, Inject, Injectable, PLATFORM_ID, RendererFactory2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MyTranslateService {
  private readonly renderer=inject(RendererFactory2).createRenderer(null,null);

  constructor(private translateService:TranslateService, @Inject(PLATFORM_ID) private platformId:object) {
    if(isPlatformBrowser(this.platformId)){
      // const savedLang:String='en';
      // set Default lang
      this.translateService.setDefaultLang('en');
      // get local storage lang
      const savedLang=localStorage.getItem('lang')
      // use lang from localstorage
      if (savedLang) {
        this.translateService.use(savedLang);
      }
      this.changeDirectio();
    }
   }

   changeDirectio(){
    if (localStorage.getItem('lang')==='en') {
      this.renderer.setAttribute(document.documentElement,'dir','ltr');
      this.renderer.setAttribute(document.documentElement,'lang','en');

    }else if (localStorage.getItem('lang')==='ar') {
      this.renderer.setAttribute(document.documentElement,'dir','rtl');
      this.renderer.setAttribute(document.documentElement,'lang','ar');

    }
   }
   changLangTranslate(lang:string){
    //save lang in localStorage
    localStorage.setItem("lang",lang);

    //use lang
    this.translateService.use(lang);
    //change Direction
    this.changeDirectio();
   }
}
