import { FunnyComponent } from './funny.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FunnyRoutingModule } from './funny-routing.module';
import { NgFormModule } from '@shared/ng-form/ng-form.module';
import { NzSharedModule } from '@shared/nz-shared/nz-shared.module';

@NgModule({
  declarations: [
    FunnyComponent,
  ],
  imports: [
    CommonModule,
    FunnyRoutingModule,
    NgFormModule,
    NzSharedModule,
  ]
})
export class FunnyModule { }
