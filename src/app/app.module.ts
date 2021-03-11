import { NzSharedModule } from '@shared/nz-shared/nz-shared.module';
import { NgFormModule } from '@shared/ng-form/ng-form.module';
import { Injectable, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_TW } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { SideBarComponent } from './global/side-bar/side-bar.component';
import { LogoComponent } from './global/logo/logo/logo.component';
import { IndexComponent } from './pages/index/index.component';
import { HammerGestureConfig, HammerModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { WeiCustomModule } from '@shared/wei-custom/wei-custom.module';
import {GameComponent} from '@root/pages/game/game.component';
import {WelcomeComponent} from '@root/pages/welcome/welcome.component';
import {FunnyComponent} from '@root/pages/funny/funny.component';
import {NzMessageService} from 'ng-zorro-antd/message';

@Injectable()
export class MyHammerConfig extends HammerGestureConfig {

  public option: HammerOptions = {
    touchAction: 'auto',
    inputClass: Hammer.MouseInput,
    recognizers: [
      [Hammer.Swipe, { direction: Hammer.DIRECTION_ALL }],
      [Hammer.Rotate],
      [Hammer.Pinch, { enable: true }, ['rotate']],
      // [Hammer.Pan]
    ]
  };

  buildHammer(element: HTMLElement): HammerManager {

    return new Hammer.Manager(element, this.option);
 }
}

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    LogoComponent,
    IndexComponent,
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NgFormModule,
    NzSharedModule,
    HammerModule,
    WeiCustomModule,
  ],
  providers: [
    NzMessageService,
    {
      provide: NZ_I18N, useValue: zh_TW
    },
    {
      provide: HAMMER_GESTURE_CONFIG, useClass: MyHammerConfig
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
