import { Observable, Subscription, timer } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-finger-guessing',
  templateUrl: './finger-guessing.component.html',
  styleUrls: ['./finger-guessing.component.less']
})
export class FingerGuessingComponent implements OnInit {

  public userChoose: number = -1;
  public aiChoose: number = -1;

  public win: number = 0;
  public loss: number = 0;
  public tie: number = 0;

  constructor() {}

  ngOnInit(): void {}

  public gameReset(): void {

    this.userChoose = -1;
    this.aiChoose = -1;
  }

  public onClick(choose: number): void {

    if (choose < 0 || 3 < choose) {

      return;
    }

    if (this.userChoose !== -1) {

      this.gameReset();

      return;
    }

    this.userChoose = choose;

    this.aiChoose = this.random();

    const result = this.checkUserWin();

    if (result === 1) {

      this.win ++;
    }
    else if (result === 0) {

      this.tie ++;
    }
    else if (result === -1) {

      this.loss++;
    }
  }

  public checkUserWin(): number {

    if (this.userChoose === this.aiChoose) {

      return 0;
    }

    if (this.userChoose === this.aiChoose + 1 || this.userChoose === this.aiChoose - 2) {

      return 1;
    }

    return -1;
  }

  public showUserItem(item: number): boolean {

    if (this.userChoose === -1 || this.userChoose === item) {

      return true;
    }

    return false;
  }

  public showAiItem(item: number): boolean {

    if (this.aiChoose === -1 || this.aiChoose !== item) {

      return false;
    }

    return true;
  }

  public random(): number {

    return Math.floor(Math.random() * 3);
  }
}
