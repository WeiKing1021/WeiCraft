import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit } from '@angular/core';
import { NzDrawerComponent, NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzLayoutComponent } from 'ng-zorro-antd/layout';
import { timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements AfterViewInit {

  public sidebarWidth: number = 256;

  public collapsed: boolean = false;
  public visible: boolean = false;

  constructor(private drawerSv: NzDrawerService) {
  }

  public collapsedChange(): void {

    this.visible = false;
  }

  ngAfterViewInit(): void {

    // this.injectSideBarListener();
    // this.drawerSv.create();
  }

  /*public injectSideBarListener(): void {

        const drawer = document.getElementsByClassName('ant-drawer ant-drawer-left ng-star-inserted ant-drawer-open').item(0);

        if (drawer !== null) {

          const handler = new Hammer.Manager(drawer, {
            touchAction: 'auto',
            inputClass: Hammer.TouchInput,
            recognizers: [
              [Hammer.Swipe, { direction: Hammer.DIRECTION_LEFT }],
            ]
          });

          handler.on('swipeleft', () => {

            this.closeSideBar();
          });
        }

  }*/

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

  public test(): void {

    alert('TEST');
  }

  public reg(myComponentRef: NzDrawerComponent): void {

    // alert(myComponentRef.listOfNzSiderComponent.length);
    // alert(myComponentRef.templateContext);

    /*const sub = timer(0, 500).subscribe((val) => {

      const n: number = 256;


      myComponentRef.listOfNzSiderComponent.forEach((item, index, array) => {

        item.nzWidth = (n - 10);
      });

      if (val++ === 20) {

        sub.unsubscribe();
      }
    });*/
  }

  public onSwipe($event: Event): void {

  }
}
