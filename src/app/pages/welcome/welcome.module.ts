import { NzSharedModule } from '@shared/nz-shared/nz-shared.module';
import { NgFormModule } from '@shared/ng-form/ng-form.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome.component';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from 'app/icons-provider.module';
import { MoreComponent } from './more/more.component';

@NgModule({
  declarations: [
    WelcomeComponent,
    MoreComponent,
  ],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    NgFormModule,
    NzSharedModule,
  ]
})
export class WelcomeModule { }
