import { Routes, Router } from '@angular/router';
import { Observable, timer } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.less']
})
export class WelcomeComponent implements OnInit {

  public text: string = 'BBAQQAQQ';
  public num: number = 0;
  public timer: Observable<number>;

  constructor() {

    this.timer = timer(0, 1000);
  }

  ngOnInit(): void {

    const sub = this.timer.subscribe((value) => {

      this.num++;

      if (this.num === 10) {

        sub.unsubscribe();
      }
    });
  }
}
