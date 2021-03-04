import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit } from '@angular/core';
import { NzDrawerComponent, NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzLayoutComponent } from 'ng-zorro-antd/layout';
import { timer } from 'rxjs';
import { HammerEvent } from './directive/wei-hammer.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  public hammerOption: HammerOptions = {
    touchAction: 'auto',
    inputClass: Hammer.TouchInput,
    recognizers: [
      [Hammer.Swipe, { direction: Hammer.DIRECTION_ALL }],
    ]
  };

  public sidebarWidth: number = 256;

  public collapsed: boolean = false;
  public visible: boolean = false;

  private swipeBond: number = 0.4;

  constructor(private drawerSv: NzDrawerService) {
  }

  public collapsedChange(): void {

    this.visible = false;
  }

  public openSideBar(): void {

    if (!this.collapsed) {

      return;
    }

    this.visible = true;
  }

  public closeSideBar(): void {

    this.visible = false;
  }

  public isSideBarVisible(): boolean {

    if (!this.collapsed) {

      return false;
    }

    return this.visible;
  }

  public onHammer($hammer: HammerEvent): void {

    if ($hammer.input.pointers.length == 0 || !($hammer.input.pointers[0] instanceof Touch)) {

      return;
    }

    const el: HTMLElement = $hammer.elRef.nativeElement;
    const event: Touch = $hammer.input.pointers[0];

    const startX = event.pageX - $hammer.input.deltaX - el.getBoundingClientRect().x;
    // const startY = event.pageY - $hammer.input.deltaY - el.getBoundingClientRect().y;

    if ($hammer.input.type === 'swiperight') {

      if (startX > el.getBoundingClientRect().width * 0.7) {

        return;
      }

      if ($hammer.input.velocity < this.swipeBond) {

        return;
      }

      this.openSideBar();

      if ($hammer.input.velocity > 5) {

        alert('你拉太大力了啦！');
      }
    }
    else if ($hammer.input.type === 'swipeleft') {

      if (startX < this.sidebarWidth) {

        return;
      }

      if ($hammer.input.velocity > this.swipeBond * -1) {

        return;
      }

      this.closeSideBar();
    }
  }
}
