import { v4 as uuid } from 'uuid';

export class AnonymousChatUser {
  public uuid: string;
  public name: string;

  public static new(name: string): AnonymousChatUser {

    const chatUser = new AnonymousChatUser();

    chatUser.uuid = uuid();

    chatUser.name = name;

    return chatUser;
  }
}
