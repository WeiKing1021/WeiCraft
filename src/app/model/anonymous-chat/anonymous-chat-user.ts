import { v4 as uuid } from 'uuid';

export class AnonymousChatUser {
  public icon: string | null;
  public uuid: string;
  public name: string;

  public static new(icon: string | null, name: string): AnonymousChatUser {

    const chatUser = new AnonymousChatUser();

    chatUser.icon = icon;

    chatUser.uuid = uuid();

    chatUser.name = name;

    return chatUser;
  }
}
