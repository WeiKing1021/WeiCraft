import {AnonymousChatUser} from '@root/model/anonymous-chat/anonymous-chat-user';

export class AnonymousChatContent {

  user: AnonymousChatUser;
  message: string;
  time: number;

  public static create(user: AnonymousChatUser, message: string): AnonymousChatContent {

    const chatContent = new AnonymousChatContent();

    chatContent.user = user;
    chatContent.message = message;
    chatContent.time = Date.now();

    return chatContent;
  }
}
