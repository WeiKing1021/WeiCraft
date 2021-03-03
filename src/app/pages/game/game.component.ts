import { Component, OnInit } from '@angular/core';
import { NzProgressComponent, NzProgressStrokeColorType } from 'ng-zorro-antd/progress';
import { timer } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.less']
})
export class GameComponent implements OnInit {

  public cards: {
    img: string;
    title: string;
    description: string;
    extra: string;
    router: string;
  }[] = [
    {
      img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      title: '猜拳小遊戲',
      description: '來和電腦猜拳吧！',
      extra: '開始遊戲',
      router: 'finger-guessing',
    },
    {
      img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      title: '猜拳小遊戲EX',
      description: '來和電腦EX猜拳吧！',
      extra: '開始遊戲',
      router: 'finger-guessing',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
