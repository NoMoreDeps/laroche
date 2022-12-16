/**
 * Part of Moon library under the MIT license
 */
import { RunableStep } from "./AnimationBuilder" ;
import { Tween }       from "./Tween"            ;

export class AnimationRunner {
  _curSteps   : RunableStep[]    = [] ;
  _tweens     : Tween<unknown>[] = [] ;
  _doAsync    : Promise<void>[]  = [] ;
  _state      : string           = "" ;
  _curTargets : Array<any>       = [] ;
  _steps      : RunableStep[]         ;

  constructor(steps: RunableStep[] = []) {
    this._steps = steps
  }

  async play() {
    if (this._curSteps.length === 0) {
      this._curSteps = this._steps.filter(_ => _());
    }

    if (this._state === "PAUSED") {
      this._tweens.forEach(_ => _.play());
      return;
    }

    if(this._state === "PLAYING") {
      return;
    }

    if (this._tweens.length) return;

    this._state = "PLAYING";
    while(this._curSteps.length) {
      this._tweens.length  = 0;
      this._doAsync.length = 0;
      let stp: RunableStep | undefined;
      do {
        stp = this._curSteps.shift();
        if (stp) {
          const metaStp = stp();
          switch (metaStp.type) {
            case "SELECT":
              this._curTargets = metaStp.data;
              break;
            case "NEXT":
              if (metaStp.data) {
                this._tweens.push(metaStp.data() as unknown as Tween<unknown>);
              }
              stp = void 0;
              break;
            case "TWEEN":
              this._tweens.push(metaStp.data(this._curTargets).play());
              break;
            case "APPLY_FCT_ASYNC":
              this._doAsync.push(metaStp.data(this._curTargets));
              break;
            case "APPLY_PROPS":
            case "APPLY_FCT":
              metaStp.data(this._curTargets);
              break;
          }
        }
      } while(stp);
      const promises = this._tweens.map(_ => _.asyncComplete());
      await Promise.all(promises);
      await Promise.all(this._doAsync);
      this._state = "ENDED";
    }
  }

  pause() {
    this._state = "PAUSED";
    this._tweens.forEach(_ => _.pause());
  }

  stop() {
    this._state           = "STOPPED"   ;
    this._curSteps.length = 0           ;
    this._tweens.forEach(_ => {
      try {_.stop();} catch(_ex){}
    }) ;
    this._tweens.length   = 0           ;
  }

  dispose() {
    this._tweens.forEach(_ => _.dispose());
    this._tweens.length     = 0;
    this._curSteps.length   = 0;
    this._doAsync.length    = 0;
    this._curTargets.length = 0;
  }
}