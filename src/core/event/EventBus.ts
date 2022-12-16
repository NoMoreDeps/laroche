import { Guid } from "../utils/Guid";

type THandler = {
  id       : string                  ;
  callback : (data: unknown) => void ;
  once     : boolean                 ;
}

export type CancelEvent = {
  id  : string;
  off : () => boolean | void;
}

export class EventBus {
  #events = new Map<string, Map<string, THandler>>();

  on<T>(eventName: string, callback: (data: T) => void, once: boolean = false) {
    !this.#events.has(eventName)
      && this.#events.set(eventName, new Map<string, THandler>());

    const fullHandler = { id: Guid.getGuid(), callback, once } as THandler;
    this.#events.get(eventName)!.set(fullHandler.id, fullHandler);

    return {
      id  : fullHandler.id,
      off : () => this.#events.get(eventName)?.delete(fullHandler.id)
    };
  };

  emit(eventName: string, data?: unknown) {
    this.#events.get(eventName)?.forEach((v,k,m)=> {
      v.callback(data);
      v.once && m.delete(k);
    });
  }

  clear() {
    this.#events = new Map<string, Map<string, THandler>>();
  }
}
