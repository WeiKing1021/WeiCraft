export class WebSocketPacket<T> {
  public type: string | null;
  public container: T;

  public static new<E>(type: string | null, container: E): WebSocketPacket<E> {

    const packet = new WebSocketPacket<E>();

    packet.type = type;
    packet.container = container;

    return packet;
  }

  public static newAnonymous<E>(container: E): WebSocketPacket<E> {

    return WebSocketPacket.new(null, container);
  }
}
