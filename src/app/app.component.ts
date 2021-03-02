import { Component, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  public sidebarWidth: number = 256;

  public collapsed: boolean = false;
  public visible: boolean = false;

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
}
