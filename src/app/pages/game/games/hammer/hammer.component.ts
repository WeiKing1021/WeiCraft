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
    const startX = event.x - $hammer.input.deltaX - el.getBoundingClientRect().x;
    const startY = event.y - $hammer.input.deltaY - el.getBoundingClientRect().y;
  }
}
