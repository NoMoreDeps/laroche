"use strict";
/**
 * Part of Moon library under the MIT license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimationBuilder = void 0;
const Timer_1 = require("../time/Timer");
const AnimationRunner_1 = require("./AnimationRunner");
const Tween_1 = require("./Tween");
class AnimationBuilder {
    constructor() {
        this._targets = {};
        this._steps = [];
    }
    resetBuilder() {
        this._steps.length = 0;
        this._targets = {};
    }
    createStep() {
        const step = this._steps.shift();
        if ((step === null || step === void 0 ? void 0 : step.type) === "SELECT") {
            const targets = [];
            step.data.forEach(_ => {
                const tgs = Array.isArray(this._targets[_]) ? this._targets[_] : [this._targets[_]];
                targets.push(...tgs);
            });
            return () => ({ type: "SELECT", data: targets });
        }
        if ((step === null || step === void 0 ? void 0 : step.type) === "TWEEN") {
            return () => ({ type: "TWEEN", data: (targets) => new Tween_1.Tween(step.data).applyTo(targets) });
        }
        if ((step === null || step === void 0 ? void 0 : step.type) === "APPLY_PROPS") {
            return () => ({ type: "APPLY_PROPS", data: (targets) => targets.forEach(target => {
                    Object.keys(step.data).forEach(keyProp => {
                        typeof target[keyProp] === "function"
                            ? target[keyProp](...step.data[keyProp])
                            : target[keyProp] = step.data[keyProp];
                    });
                }) });
        }
        if ((step === null || step === void 0 ? void 0 : step.type) === "APPLY_FCT") {
            return () => ({
                type: "APPLY_FCT",
                data: (targets) => step.data(targets)
            });
        }
        if ((step === null || step === void 0 ? void 0 : step.type) === "APPLY_FCT_ASYNC") {
            return () => ({
                type: "APPLY_FCT_ASYNC",
                data: (targets) => step.data(targets)
            });
        }
        return () => ((step === null || step === void 0 ? void 0 : step.data) ? { type: "NEXT", data: step.data } : { type: "NEXT" });
    }
    setTargets(id, ...targets) {
        this._targets[id] = targets;
        return this;
    }
    select(...targets) {
        this._steps.push({ type: "SELECT", data: targets });
        return this;
    }
    nextStep(wait) {
        if (wait) {
            this._steps.push({ type: "NEXT", data: () => ({ asyncComplete: () => new Promise(r => Timer_1.Timer.once(wait, () => r())) })
            });
        }
        this._steps.push({ type: "NEXT", data: () => ({ asyncComplete: () => new Promise(r => r()) })
        });
        return this;
    }
    tween(options) {
        this._steps.push({ type: "TWEEN", data: options });
        return this;
    }
    props(props) {
        this._steps.push({ type: "APPLY_PROPS", data: props });
        return this;
    }
    do(handler) {
        this._steps.push({ type: "APPLY_FCT", data: handler });
        return this;
    }
    doAsync(handler) {
        this._steps.push({ type: "APPLY_FCT_ASYNC", data: handler });
        return this;
    }
    build() {
        const runnableSteps = [];
        while (this._steps.length) {
            runnableSteps.push(this.createStep());
        }
        this.resetBuilder();
        return new AnimationRunner_1.AnimationRunner(runnableSteps);
    }
}
exports.AnimationBuilder = AnimationBuilder;
