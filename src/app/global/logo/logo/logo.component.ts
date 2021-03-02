import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.less']
})
export class LogoComponent implements OnInit {

  @Output() routeEvent = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  public onRoute(): void {

    this.routeEvent.emit();
  }
}
