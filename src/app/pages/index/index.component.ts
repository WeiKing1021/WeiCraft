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

  public viewList: {
    text: string,
    image: string,
  }[];

  constructor() {

    this.timer = timer(0, 500);

    this.viewList = [
      {
        text: '這是想長大的小雞',
        image: 'assets/chicken/chicken0.png',
      },
      {
        text: '這是長超大隻的小雞',
        image: 'assets/chicken/chicken1.png',
      }
    ];
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
