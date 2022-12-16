/**
 * Part of Moon library under the MIT license
 */

import { Timer } from "../time/Timer";
import { AnimationRunner }     from "./AnimationRunner" ;
import { Tween, TweenOptions } from "./Tween"           ;

type StepType = "SELECT" | "TWEEN" | "NEXT" | "APPLY_PROPS" | "APPLY_FCT" | "APPLY_FCT_ASYNC";

type Fct = (...args: any) => any;

type Step = {
  type : StepType;
  data ?: string[] | TweenOptions<unknown> | Object | ((target: any) => void) | void;
};

type ConditionalTypes<Base, Condition, Extract extends Boolean> =  Pick<Base, {
  [Key in keyof Base]: Extract extends true ?
    Base[Key] extends Condition ? Key : never
    :
    Base[Key] extends Condition ? never : Key
}[keyof Base]>;

type ParameterType<T extends {[key: string]: Fct | any}> = Partial<
  ConditionalTypes<T, Function, false> // Properties that are not functions
  &
  {
    [K in keyof ConditionalTypes<T, Function, true>]: Parameters<ConditionalTypes<T, Function, true>[K]> // Tuple
  }
>;

export type RunableStep = (() => {
  type : "SELECT" ;
  data : any[]    ;
}) | (() => {
  type : "TWEEN"                            ;
  data : (targets: any[]) => Tween<unknown> ;
}) | (() => {
  type : "APPLY_PROPS"            ;
  data : (targets: any[]) => void ;
}) | (() => {
  type : "APPLY_FCT"              ;
  data : (targets: any[]) => void ;
}) | (() => {
  type : "APPLY_FCT_ASYNC"              ;
  data : (targets: any[]) => Promise<void> ;
}) | (() => {
  type: "NEXT";
  data ?: () => Promise<void>;
});

export class AnimationBuilder {
  _targets     : {[key: string]: any[]} = {} ;
  _steps       : Step[]                 = [] ;

  protected resetBuilder() {
    this._steps.length = 0;
    this._targets = {};
  }

  protected createStep(): RunableStep {
    const step = this._steps.shift();

    if (step?.type === "SELECT") {
      const targets: any[] = [];
      (step.data as string[]).forEach(_ => {
        const tgs = Array.isArray(this._targets[_]) ? this._targets[_] : [this._targets[_]];
        targets.push(...tgs);
      });
      return () => ({type: "SELECT", data: targets});
    }

    if (step?.type === "TWEEN") {
      return () => ({type: "TWEEN", data: (targets: any[]) => new Tween(step.data! as TweenOptions<unknown>).applyTo(targets)});
    }

    if (step?.type === "APPLY_PROPS") {
      return () => ({type: "APPLY_PROPS", data: (targets: any[]) => targets.forEach(target => {
        Object.keys(step.data as Object).forEach(keyProp => {
          typeof target[keyProp] === "function"
          ? target[keyProp](...(step.data as any)[keyProp])
          : target[keyProp] = (step.data as any)[keyProp]
        });
      })});
    }

    if (step?.type === "APPLY_FCT") {
      return () => ({
        type: "APPLY_FCT",
        data: (targets: any[]) => (step.data as (targets: any[]) => void)(targets)
      });
    }

    if (step?.type === "APPLY_FCT_ASYNC") {
      return () => ({
        type: "APPLY_FCT_ASYNC",
        data: (targets: any[]) => (step.data as (targets: any[]) => Promise<void>)(targets)
      });
    }

    return () => (step?.data ? { type: "NEXT" , data: step.data as () => Promise<void>} : { type: "NEXT" });
  }

  setTargets(id: string, ...targets: any[]) {
    this._targets[id] = targets;
    return this;
  }
  select(...targets: string[]) {
    this._steps.push({ type: "SELECT", data: targets });
    return this;
   }
  nextStep(wait?: number) {
    if (wait) {
      this._steps.push({ type: "NEXT", data: () =>
        ({asyncComplete: () => new Promise<void>(r => Timer.once(wait, () => r()))})
      });
    }
    this._steps.push({ type: "NEXT", data: () =>
      ({asyncComplete: () => new Promise<void>(r => r())})
    });
    return this;
  }
  tween<T>(options: TweenOptions<T>)  {
    this._steps.push({ type: "TWEEN", data: options });
    return this;
  }
  props<T extends { [key: string]: any }>(props: ParameterType<T>) {
    this._steps.push({ type: "APPLY_PROPS", data: props });
    return this;
  }
  do<T>(handler: (_: T) => void) {
    this._steps.push({ type: "APPLY_FCT", data: handler });
    return this;
  }
  doAsync<T>(handler: (_: T) => Promise<void>) {
    this._steps.push({ type: "APPLY_FCT_ASYNC", data: handler });
    return this;
  }
  build(){
    const runnableSteps : RunableStep[] = [];
    while(this._steps.length) {
      runnableSteps.push(this.createStep());
    }

    this.resetBuilder();
    return new AnimationRunner(runnableSteps);
  }
}
