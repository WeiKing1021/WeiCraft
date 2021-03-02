import { FunnyComponent } from './funny.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routers: Routes = [
  { path: '', component: FunnyComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routers)],
  exports: [RouterModule],
})
export class FunnyRoutingModule { }
