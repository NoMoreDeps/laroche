"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tween = void 0;
/**
 * Part of Moon library under the MIT license
 */
const Timer_1 = require("../time/Timer");
const EventBus_1 = require("../core/event/EventBus");
const Easing_1 = require("./Easing");
class Tween {
    constructor(options) {
        this._eventBus = new EventBus_1.EventBus();
        this._disposed = false;
        this._options = options;
        this._sources = [];
        this._props = new Map();
        this._tpmTargets = [];
        this._timer = new Timer_1.Timer({
            interval: options.duration,
            yoyo: options.yoyo,
            repeat: options.repeat,
        });
        this.setProps(options.props);
    }
    setProps(props) {
        if (this._disposed)
            return;
        if (!(this._timer.state === Timer_1.TimerState.NotStarted
            || this._timer.state === Timer_1.TimerState.Finished
            || this._timer.state === Timer_1.TimerState.Paused))
            return;
        this._props = new Map();
        for (const prop in props) {
            this._props.set(prop, props[prop]);
        }
    }
    applyTo(sources) {
        if (this._disposed)
            return this;
        if (this._timer.state === Timer_1.TimerState.NotStarted
            || this._timer.state === Timer_1.TimerState.Finished
            || this._timer.state === Timer_1.TimerState.Paused) {
            this._sources = Array.isArray(sources) ? sources : [sources];
        }
        return this;
    }
    reset() {
        if (this._disposed)
            return;
        this._timer.stop();
        this.setProps(this._options.props);
        this._timer.tack(0);
        this.updateRender();
    }
    stop() {
        if (this._disposed)
            return;
        this._timer.stop();
    }
    pause() {
        if (this._disposed)
            return;
        this._timer.pause();
    }
    play() {
        var _a, _b, _c;
        if (this._disposed)
            return this;
        try {
            this._tpmTargets.length = 0;
            this._props.forEach((v, k) => {
                this._sources.forEach((_) => {
                    var _a, _b;
                    const _from = (v.from !== void 0 ? v.from : (v.converter ? (_b = (_a = v.converter) === null || _a === void 0 ? void 0 : _a.read) === null || _b === void 0 ? void 0 : _b.call(_a, _[k]) : _[k]));
                    this._tpmTargets.push({
                        target: _,
                        from: _from,
                        prop: k,
                        to: v.to - _from,
                    });
                });
            });
            (_a = this._onFinished) === null || _a === void 0 ? void 0 : _a.clear();
            (_b = this._onTickEnd) === null || _b === void 0 ? void 0 : _b.clear();
            (_c = this._onTickStart) === null || _c === void 0 ? void 0 : _c.clear();
            this._timer.reset();
            this._onTickStart = this._timer.once("START_TICK", () => {
                this.updateRender();
                this._eventBus.emit("UPDATE", this);
            });
            this._onTickEnd = this._timer.on("END_TICK", () => {
                if (this._timer.state === Timer_1.TimerState.Finished)
                    return;
                this.updateRender();
                this._eventBus.emit("UPDATE", this);
            });
            this._onFinished = this._timer.once("FINISHED", () => {
                this.updateRender();
                this._eventBus.emit("COMPLETE", this);
            });
            this._timer.play();
        }
        catch (ex) {
            this.stop();
        }
        return this;
    }
    updateRender() {
        if (this._disposed)
            return;
        try {
            const value = this._timer.timeInInterval;
            this._tpmTargets.forEach(_ => {
                var _a, _b, _c, _d;
                const easingFunction = (_a = this._options.easing) !== null && _a !== void 0 ? _a : Easing_1.Easing.easeLinear;
                const newValue = easingFunction(value, _.from, _.to, this._options.duration);
                ((_b = this._props.get(_.prop)) === null || _b === void 0 ? void 0 : _b.converter)
                    ? _.target[_.prop] = (_d = (_c = this._props.get(_.prop)) === null || _c === void 0 ? void 0 : _c.converter) === null || _d === void 0 ? void 0 : _d.write(newValue)
                    : _.target[_.prop] = newValue;
            });
        }
        catch (ex) {
            this.stop();
            this.dispose();
        }
    }
    on(eventName, handler) {
        const res = this._eventBus.on(eventName, handler);
        return { clear: () => res.off() };
    }
    asyncComplete() {
        return new Promise(r => this._timer.once("FINISHED", (_) => r()));
    }
    dispose() {
        delete this["_options"];
        delete this["_props"];
        this._sources.length = 0;
        this._props = new Map();
        this._tpmTargets.length = 0;
        ;
        this._timer.dispose();
    }
}
exports.Tween = Tween;
