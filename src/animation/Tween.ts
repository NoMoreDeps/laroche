/**
 * Part of Moon library under the MIT license
 */
import { CancelTimer, Timer, TimerState } from "../time/Timer";
import { EventBus } from "../core/event/EventBus";
import { Easing } from "./Easing";

type ConditionalTypes<Base, Condition, Extract extends Boolean> =  Pick<Base, {
  [Key in keyof Base]: Extract extends true ?
    Base[Key] extends Condition ? Key : never
    :
    Base[Key] extends Condition ? never : Key
}[keyof Base]>;

export type TweenProps = {
  from ?: number;
  to    : number;
  converter?: {
    read? : (input: any) => number,
    write : (input: number) => any
  }
};

export type CancelTween  = { clear: () => void };

export type TweenOptions<T> = {
  yoyo     ?: boolean;
  duration  : number;
  repeat   ?: number;
  easing   ?: (t: number, b: number, c: number, d: number) => number;
  props     : Partial<{ [key in keyof ConditionalTypes<T, Function, false>]: TweenProps}>
};

export class Tween<T> {
  protected _disposed     : boolean                 ;
  protected _options      : TweenOptions<T>         ;
  protected _timer        : Timer                   ;
  protected _sources      : Array<T>                ;
  protected _props        : Map<string, TweenProps> ;
  protected _onTickStart ?: CancelTimer             ;
  protected _onTickEnd   ?: CancelTimer             ;
  protected _onFinished  ?: CancelTimer             ;
  protected _tpmTargets   : Array<{target: T, from: number, to: number, prop: string}>;
  protected _eventBus     = new EventBus()          ;

  constructor(options: TweenOptions<T>) {
    this._disposed   = false;
    this._options    = options                       ;
    this._sources    = []                            ;
    this._props      = new Map<string, TweenProps>() ;
    this._tpmTargets = []                            ;

    this._timer = new Timer({
      interval : options.duration ,
      yoyo     : options.yoyo     ,
      repeat   : options.repeat   ,
    });

    this.setProps(options.props);
  }

  setProps(props: Partial<{ [key in keyof ConditionalTypes<T, Function, false>]: TweenProps}> ) {
    if (this._disposed) return;
    if (!(
         this._timer.state === TimerState.NotStarted
      || this._timer.state === TimerState.Finished
      || this._timer.state === TimerState.Paused
    )) return;

    this._props = new Map<string, TweenProps>();
    for(const prop in props) {
      this._props.set(prop, (props as any)[prop]!);
    }
  }

  applyTo(sources: T | Array<T>) {
    if (this._disposed) return this;
    if (
         this._timer.state === TimerState.NotStarted
      || this._timer.state === TimerState.Finished
      || this._timer.state === TimerState.Paused) {
      this._sources = Array.isArray(sources) ? sources : [sources];
    }
    return this;
  }

  reset() {
    if (this._disposed) return;
    this._timer.stop();
    this.setProps(this._options.props);
    this._timer.tack(0);
    this.updateRender();
  }

  stop() {
    if (this._disposed) return;
    this._timer.stop();
  }

  pause() {
    if (this._disposed) return;
    this._timer.pause();
  }

  play() {
    if (this._disposed) return this;
    try {
    this._tpmTargets.length = 0;
    this._props.forEach((v,k) => {
      this._sources.forEach((_:any) => {
        const _from = (v.from !== void 0 ? v.from : (v.converter ? v.converter?.read?.(_[k]) : _[k]));
        this._tpmTargets.push({
          target : _            ,
          from   : _from        ,
          prop   : k            ,
          to     : v.to - _from ,
        });
      });
    });

    this._onFinished?.clear();
    this._onTickEnd?.clear();
    this._onTickStart?.clear();
    this._timer.reset();

    this._onTickStart = this._timer.once("START_TICK", () => {
      this.updateRender();
      this._eventBus.emit("UPDATE", this);
    });

    this._onTickEnd = this._timer.on("END_TICK", () => {
      if (this._timer.state === TimerState.Finished) return;
      this.updateRender();
      this._eventBus.emit("UPDATE", this);
    });

    this._onFinished = this._timer.once("FINISHED", () => {
      this.updateRender();
      this._eventBus.emit("COMPLETE", this);
    });

    this._timer.play();
  } catch(ex) { this.stop(); }
    return this;
  }

  private updateRender() {
    if (this._disposed) return;
    try {
      const value = this._timer.timeInInterval;
      this._tpmTargets.forEach(_ => {
        const easingFunction = this._options.easing ?? Easing.easeLinear;
        const newValue = easingFunction(value, _.from, _.to, this._options.duration);
        this._props.get(_.prop)?.converter
        ? (_.target as any)[_.prop] = this._props.get(_.prop)?.converter?.write(newValue)
        : (_.target as any)[_.prop] = newValue;
      });
    } catch(ex) {
      this.stop();
      this.dispose();
    }
  }

  on(eventName: "COMPLETE" | "UPDATE", handler: (tween: Tween<T>) => void) {
    const res = this._eventBus.on(eventName, handler);
    return { clear: () => res.off() } as CancelTween;
  }

  asyncComplete() {
    return new Promise<void>(r => this._timer.once("FINISHED", (_:any) => r()));
  }

  dispose() {
    delete (this as any)["_options"];
    delete (this as any)["_props"];
    this._sources.length    = 0;
    this._props             = new Map<string, TweenProps>() ;
    this._tpmTargets.length = 0;                           ;
    this._timer.dispose();
  }
}