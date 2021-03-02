import { timer, Observable, Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less']
})
export class IndexComponent implements OnInit, OnDestroy {

  public timer: Observable<number>;

  public scheduler: Subscription | undefined;

  public textArray: string[] = [
    '第一段文字',
    '第二段文字',
    '第三段文字',
    '第四段文字',
  ];

  constructor() {

    this.timer = timer(0, 500);
  }

  ngOnInit(): void {

    this.scheduler = this.timer.subscribe(() => {

      window.dispatchEvent(new Event('resize'));
    });
  }

  ngOnDestroy(): void {

    this.scheduler?.unsubscribe();
  }
}
