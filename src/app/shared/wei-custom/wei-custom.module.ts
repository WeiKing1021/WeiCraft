import { WeiHammerDirective } from './../../directive/wei-hammer.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    WeiHammerDirective,
  ],
  imports: [
    CommonModule,
    // WeiHammerDirective,
  ],
  exports: [
    WeiHammerDirective
  ]
})
export class WeiCustomModule { }
