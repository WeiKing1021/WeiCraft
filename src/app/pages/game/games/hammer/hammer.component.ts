import { HammerEvent } from './../../../../directive/wei-hammer.directive';
import {Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit, QueryList} from '@angular/core';
import { AppComponent } from '../../../../app.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hammer',
  templateUrl: './hammer.component.html',
  styleUrls: ['./hammer.component.less']
})
export class HammerComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;

  public hammerOption: HammerOptions = {
    // touchAction: 'auto',
    // inputClass: Hammer.MouseInput,
    recognizers: [
      [Hammer.Swipe, { direction: Hammer.DIRECTION_ALL }],
    ]
  };

  public canvasOption: HammerOptions = {
    touchAction: 'auto',
    inputClass: Hammer.MouseInput,
    recognizers: [
      [Hammer.Swipe, { direction: Hammer.DIRECTION_ALL }],
    ]
  };

  public testOption: HammerOptions = {
    touchAction: 'auto',
    // inputClass: Hammer.MouseInput,
    recognizers: [
      [Hammer.Pan, { direction: Hammer.DIRECTION_ALL }],
    ]
  };

  public swipeType: string = 'None';

  public swipeDirect: number = -1;

  public velocity: number = 0;

  public startX: number = NaN;
  public startY: number = NaN;

  public endX: number = NaN;
  public endY: number = NaN;

  private collapseSubscriber: Subscription;
  private ctx: CanvasRenderingContext2D | null;

  public paintList: {
    style: string | CanvasGradient | CanvasPattern;
    startX: number;
    startY: number;
    width: number;
    height: number;
  }[];

  constructor(public app: AppComponent) {

    this.newPaintArray();
  }

  ngOnInit(): void {

    this.collapseSubscriber = this.app.onCollapseChange().asObservable().subscribe(event => {

      if (event.getHammer() === undefined || !event.nextState) {

        return;
      }


      event.setCancel(true);
    });
  }

  ngAfterViewInit(): void {

    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.ctx?.scale(this.getDeviceRatio(), this.getDeviceRatio());
  }

  public newPaintArray(): void {

    this.paintList = new Array<any>(0);
  }

  public onHammer($hammer: HammerEvent): void {

    const el: HTMLElement = $hammer.elRef.nativeElement;
    const event: MouseEvent = $hammer.input.pointers[0];

    this.swipeType = $hammer.input.type;

    this.swipeDirect = $hammer.input.eventType;

    this.velocity = $hammer.input.velocity;
    this.startX = event.x - $hammer.input.deltaX - el.getBoundingClientRect().x;
    this.startY = event.y - $hammer.input.deltaY - el.getBoundingClientRect().y;

    this.endX = event.x - el.getBoundingClientRect().x;
    this.endY = event.y - el.getBoundingClientRect().y;
  }

  public getDeviceRatio(): number {

    return window.devicePixelRatio;
  }

  public onCanvas($hammer: HammerEvent): void {

    const el: HTMLElement = $hammer.elRef.nativeElement;
    const event: MouseEvent = $hammer.input.pointers[0];

    /*const ratio = this.getDeviceRatio();

    const swipeType = $hammer.input.type;

    const swipeDirect = $hammer.input.eventType;

    const velocity = $hammer.input.velocity;*/

    const inputStartX = event.x - $hammer.input.deltaX - el.getBoundingClientRect().x;
    const inputStartY = event.y - $hammer.input.deltaY - el.getBoundingClientRect().y;

    /*const endX = startX + ($hammer.input.deltaX / ratio);
    const endY = startX + ($hammer.input.deltaY / ratio);*/

    // this.myCanvas?.clearRect(0, 0, 512, 512);

    if (!this.ctx) {

      return;
    }

    this.repaint();

    this.ctx.fillRect(inputStartX, inputStartY, $hammer.input.deltaX, $hammer.input.deltaY);

    if (!$hammer.input.isFinal) {

      return;
    }

    this.paintList.push({
      style: this.ctx.fillStyle,
      startX: inputStartX,
      startY: inputStartY,
      width: $hammer.input.deltaX,
      height: $hammer.input.deltaY,
    });

    this.newColor();
  }

  public newColor(): void {

    if (!this.ctx) {

      return;
    }

    this.ctx.fillStyle = 'rgb(' + Math.random() * 256 + ', ' + Math.random() * 256 + ', ' + Math.random() * 256 + ')';
  }

  public repaint(): void {

    if (!this.ctx) {

      return;
    }

    this.ctx.clearRect(0, 0, 512, 512);

    const tmpStyle = this.ctx.fillStyle;

    for (const paint of this.paintList) {

      this.ctx.fillStyle = paint.style;

      this.ctx.fillRect(paint.startX, paint.startY, paint.width, paint.height);
    }

    this.ctx.fillStyle = tmpStyle;
  }

  public clearCanvas(): void {

    if (!this.ctx) {

      return;
    }

    this.newPaintArray();

    this.ctx.clearRect(0, 0, 512, 512);
  }

  public rollback(): void {

    this.paintList.pop();

    this.repaint();
  }

  public save(): void {

    if (!this.ctx) {

      return;
    }

    const link = document.createElement('a');
    link.innerHTML = 'download image';

    link.addEventListener('click', () => {
      link.href = this.canvas.nativeElement.toDataURL('image/png')
        .replace('image/png', 'image/octet-stream');
      link.download = 'painting_' + new Date().getTime() + '.png';
    }, false);

    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  ngOnDestroy(): void {

    if (this.collapseSubscriber !== undefined) {

      this.collapseSubscriber.unsubscribe();
    }
  }
}
