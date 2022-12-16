"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimationRunner = void 0;
class AnimationRunner {
    constructor(steps = []) {
        this._curSteps = [];
        this._tweens = [];
        this._doAsync = [];
        this._state = "";
        this._curTargets = [];
        this._steps = steps;
    }
    play() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._curSteps.length === 0) {
                this._curSteps = this._steps.filter(_ => _());
            }
            if (this._state === "PAUSED") {
                this._tweens.forEach(_ => _.play());
                return;
            }
            if (this._state === "PLAYING") {
                return;
            }
            if (this._tweens.length)
                return;
            this._state = "PLAYING";
            while (this._curSteps.length) {
                this._tweens.length = 0;
                this._doAsync.length = 0;
                let stp;
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
                                    this._tweens.push(metaStp.data());
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
                } while (stp);
                const promises = this._tweens.map(_ => _.asyncComplete());
                yield Promise.all(promises);
                yield Promise.all(this._doAsync);
                this._state = "ENDED";
            }
        });
    }
    pause() {
        this._state = "PAUSED";
        this._tweens.forEach(_ => _.pause());
    }
    stop() {
        this._state = "STOPPED";
        this._curSteps.length = 0;
        this._tweens.forEach(_ => {
            try {
                _.stop();
            }
            catch (_ex) { }
        });
        this._tweens.length = 0;
    }
    dispose() {
        this._tweens.forEach(_ => _.dispose());
        this._tweens.length = 0;
        this._curSteps.length = 0;
        this._doAsync.length = 0;
        this._curTargets.length = 0;
    }
}
exports.AnimationRunner = AnimationRunner;
