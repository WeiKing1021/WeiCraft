import { Component, OnInit } from '@angular/core';
import { NzProgressComponent } from 'ng-zorro-antd/progress/public-api';
import { timer } from 'rxjs';

@Component({
  selector: 'app-funny',
  templateUrl: './funny.component.html',
  styleUrls: ['./funny.component.less']
})
export class FunnyComponent implements OnInit {

  public cards: {
    index: number;
    img: string;
    title: string;
    description: string;
    extra: string;
  }[];

  public strokeProperty: NzProgressComponent['nzStrokeColor'] = {
    '0%': 'RED',
    '25%': 'PURPLE',
    '50%': 'BLUE',
    '75%': 'YELLOW',
    '100%': 'GREEN',
  };

  public itemCount: number = 0;

  public alertMessage: string = '成功產生10個囉！';

  constructor() {

    this.cards = Array(10);

    const sub = timer(0, 1000).subscribe((value) => {

      this.cards[value] = {
        index: value,
        img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
        title: '我的標題',
        description: '我的說明文字',
        extra: 'More',
      };

      if (++value === 10) {

        sub.unsubscribe();
      }

      this.itemCount = value;
    });

    /*for (let i = 0; i < 50; i++) {

      this.cards[i] = {
        index: i,
        img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
        title: '我的標題',
        description: '我的說明文字',
        extra: 'More',
      };
    }*/
  }

  ngOnInit(): void {
  }
}
