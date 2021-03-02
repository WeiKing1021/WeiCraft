import { NzSharedModule } from '@shared/nz-shared/nz-shared.module';
import { NgFormModule } from '@shared/ng-form/ng-form.module';
import { NgModule } from '@angular/core';

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
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_TW }],
  bootstrap: [AppComponent]
})
export class AppModule { }
