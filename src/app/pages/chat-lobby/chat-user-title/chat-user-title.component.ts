import {Component, Input, OnInit} from '@angular/core';
import {AnonymousChatUser} from '@root/model/anonymous-chat/anonymous-chat-user';

@Component({
  selector: 'app-chat-user-title',
  templateUrl: './chat-user-title.component.html',
  styleUrls: ['./chat-user-title.component.less']
})
export class ChatUserTitleComponent implements OnInit {

  @Input()
  public availableIcons: string[];

  @Input()
  public chatUser: AnonymousChatUser;

  constructor() { }

  ngOnInit(): void {
  }

  public getUserIcon(): string {

    if (this.chatUser?.icon != null) {

      return this.chatUser.icon;
    }

    return this.availableIcons[0];
  }
}
