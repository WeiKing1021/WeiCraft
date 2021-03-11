import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AnonymousChatUser} from '@root/model/anonymous-chat/anonymous-chat-user';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-chat-user-login',
  templateUrl: './chat-user-login.component.html',
  styleUrls: ['./chat-user-login.component.less']
})
export class ChatUserLoginComponent implements OnInit {

  @Input()
  public availableIcons: string[];

  @Output()
  public userCreate: EventEmitter<AnonymousChatUser>;

  public userName: string;

  public selectedIcon: string;

  constructor(private messageService: NzMessageService) {

    this.userCreate = new EventEmitter<AnonymousChatUser>();
  }

  ngOnInit(): void {}

  public selectIcon(icon: string): void {

    this.selectedIcon = icon;
  }

  public isIcon(icon: string): boolean {

    if (this.selectedIcon === null) {

      return false;
    }

    return this.selectedIcon === icon;
}

  public generateUser(): void {

    const tmpName = this.userName?.replace(/^\s+|\s+$/, '');

    if (tmpName == null || tmpName === '') {

      this.messageService.error('無效的使用者名稱!');

      return;
    }

    if (this.selectedIcon == null) {

      this.messageService.error('請選擇一個圖式!');

      return;
    }

    const chatUser = AnonymousChatUser.new(this.selectedIcon, tmpName);

    this.userCreate.emit(chatUser);
  }
}
