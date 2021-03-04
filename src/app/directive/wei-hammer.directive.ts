import { Directive, ElementRef, Output, EventEmitter, Input, OnInit, OnDestroy } from '@angular/core';

export interface HammerEvent {
  input: HammerInput;
  elRef: ElementRef<any>;
}

@Directive({
  selector: '[appWeiHammer]'
})
export class WeiHammerDirective implements OnInit, OnDestroy {

  @Input() action: string;
  @Input() option: HammerOptions;
  @Output() hammer: EventEmitter<HammerEvent>;

  private handler: HammerManager;

  constructor(public elRef: ElementRef<any>) {

    this.hammer = new EventEmitter();
  }

  ngOnInit(): void {

    this.handler = new Hammer.Manager(this.elRef.nativeElement, this.option);

    this.handler.on(this.action, (hammerEvent) => {

      this.hammer.emit({
        input: hammerEvent,
        elRef: this.elRef,
      });
    });
  }

  ngOnDestroy(): void {

    this.handler.destroy();
  }
}
