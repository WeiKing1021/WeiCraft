import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.less']
})
export class SideBarComponent implements OnInit {

  @Output() routeEvent = new EventEmitter<void>();

  public openMap: { [name: string]: boolean } = {
    menu1: false,
    menu2: false,
    menu3: false
  };

  constructor() {}

  ngOnInit(): void {}

  public onOpenChange(menuName: string): void {

    for (const key in this.openMap) {

      if (key !== menuName) {

        this.openMap[key] = false;
      }
    }
  }

  public onRoute(): void {

    this.routeEvent.emit();
  }
}
