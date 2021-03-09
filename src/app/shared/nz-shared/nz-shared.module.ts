import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAlertModule } from 'ng-zorro-antd/alert';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzInputModule } from 'ng-zorro-antd/input';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    NzIconModule,
    NzMenuModule,
    NzButtonModule,
    NzLayoutModule,
    NzDrawerModule,
    NzDividerModule,
    NzAffixModule,
    NzBreadCrumbModule,
    NzCarouselModule,
    NzGridModule,
    NzCardModule,
    NzAlertModule,
    NzProgressModule,
    NzAutocompleteModule,
    NzStatisticModule,
    NzSpaceModule,
    NzInputModule,
    NzSpinModule,
    NzAvatarModule,
  ]
})
export class NzSharedModule { }
