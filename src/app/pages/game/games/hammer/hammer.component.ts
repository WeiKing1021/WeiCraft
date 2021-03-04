import { element } from 'protractor';
import { HammerEvent } from './../../../../directive/wei-hammer.directive';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hammer',
  templateUrl: './hammer.component.html',
  styleUrls: ['./hammer.component.less']
})
export class HammerComponent implements OnInit {

  public hammerOption: HammerOptions = {
    touchAction: 'auto',
    inputClass: Hammer.MouseInput,
    recognizers: [
      [Hammer.Swipe, { direction: Hammer.DIRECTION_ALL }],
    ]
  };

  private colorArray: string[] = [
    'RED',
    'YELLOW',
    'GREEN',
    'PURPLE',
    'GRAY',
    'BLUE'
  ];

  private index: number = this.colorArray.length;

  constructor() { }

  ngOnInit(): void {}

  public onHammer($hammer: HammerEvent): void {

    const el: HTMLElement = $hammer.elRef.nativeElement;
    const event: MouseEvent = $hammer.input.pointers[0];

    /*element.style.backgroundColor = this.colorArray[this.index++];

    if (this.index >= this.colorArray.length) {

      this.index = 0;
    }*/

    const x = event.pageX - el.offsetLeft;
    const y = event.pageY - el.offsetTop;

    console.log('ElementSIze: (' + el.clientWidth  + ', ' + el.clientHeight + ')');
    console.log('PointA: (' + x + ', ' + y + ')');
    // console.log(events[0].clientX + ', ' + events[0].clientY);
    // console.log($hammer.elRef.nativeElement.width);
    // console.log(events[0].offsetX + ', ' + events[0].offsetY);
    // console.log(events[0]);
  }
}
