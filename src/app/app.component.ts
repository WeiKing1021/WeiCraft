import {Component, EventEmitter, Injectable} from '@angular/core';

import { HammerEvent } from './directive/wei-hammer.directive';
import {Observable, Observer, Subject} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
@Injectable({
  providedIn: 'root',
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

  private collapseEvent: EventEmitter<CollapseEvent> = new EventEmitter<CollapseEvent>(false);

  constructor() {}

  public collapsedChange(): void {

    this.visible = false;
  }

  public openSideBar(): void {

    if (!this.collapsed) {

      return;
    }

    const newEvent = new CollapseEvent(true, undefined);

    this.collapseEvent.emit(newEvent);

    if (newEvent.isCancelled()) {

      return;
    }

    this.visible = true;
  }

  public closeSideBar(): void {

    if (!this.collapsed) {

      return;
    }

    const newEvent = new CollapseEvent(false, undefined);

    this.collapseEvent.emit(newEvent);

    if (newEvent.isCancelled()) {

      return;
    }

    this.visible = false;
  }

  public isSideBarVisible(): boolean {

    if (!this.collapsed) {

      return false;
    }

    return this.visible;
  }

  public onCollapseChange(): EventEmitter<CollapseEvent> {

    return this.collapseEvent;
  }

  public onHammer($hammer: HammerEvent): void {

    if (!this.collapsed || $hammer.input.pointers.length === 0 || !($hammer.input.pointers[0] instanceof Touch)) {

      return;
    }

    const el: HTMLElement = $hammer.elRef.nativeElement;
    const event: Touch = $hammer.input.pointers[0];

    const startX = event.pageX - $hammer.input.deltaX - el.getBoundingClientRect().x;
    // const startY = event.pageY - $hammer.input.deltaY - el.getBoundingClientRect().y;

    if ($hammer.input.type === 'swiperight') {

      if (startX > el.getBoundingClientRect().width * 0.3) {

        return;
      }

      if ($hammer.input.velocity < this.swipeBond) {

        return;
      }

      const newEvent = new CollapseEvent(true, $hammer);

      this.collapseEvent.emit(newEvent);

      if (newEvent.isCancelled()) {

        return;
      }

      if ($hammer.input.velocity > 5) {

        alert('你拉太大力了啦！');
      }

      this.visible = true;
    }
    else if ($hammer.input.type === 'swipeleft') {

      if (startX < this.sidebarWidth) {

        return;
      }

      if ($hammer.input.velocity > this.swipeBond * -1) {

        return;
      }

      const newEvent = new CollapseEvent(false, $hammer);

      this.collapseEvent.emit(newEvent);

      if (newEvent.isCancelled()) {

        return;
      }

      this.visible = false;
    }
  }
}

export class CollapseEvent {

  public nextState: boolean;
  public hammer: HammerEvent | undefined;
  public isCancel: boolean;

  constructor(nextState: boolean, hammer: HammerEvent | undefined) {

    this.nextState = nextState;
    this.hammer = hammer;
    this.isCancel = false;
  }

  public getNextState(): boolean {

    return this.nextState;
  }

  public getHammer(): HammerEvent | undefined {

    return this.hammer;
  }

  public isCancelled(): boolean {

    return this.isCancel;
  }

  public setCancel(cancel: boolean): void {

    this.isCancel = cancel;
  }
}
