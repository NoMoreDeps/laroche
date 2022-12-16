"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Timer_guid, _Timer_eventbus, _Timer_opDelay, _Timer_opEndDelay, _Timer_opInterval, _Timer_opRepeat, _Timer_opYoyo, _Timer_opAutoStart, _Timer_curElapsed, _Timer_curRepeat, _Timer_totalTime, _Timer_curPosition, _Timer_curState, _Timer_pausedState, _Timer_curDirection, _Timer_applyTick;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timer = exports.TimerState = exports.Direction = void 0;
/**
 * Part of Moon library under the MIT license
 */
const EventBus_1 = require("../core/event/EventBus");
const Guid_1 = require("../core/utils/Guid");
const MAX_TIME = 3155760000000; // 1 century, will be used instead of a real infinite loop.
var Direction;
(function (Direction) {
    Direction[Direction["Backward"] = 0] = "Backward";
    Direction[Direction["Forward"] = 1] = "Forward";
})(Direction = exports.Direction || (exports.Direction = {}));
;
var TimerState;
(function (TimerState) {
    TimerState[TimerState["NotStarted"] = 0] = "NotStarted";
    TimerState[TimerState["WaitingBeforeStart"] = 1] = "WaitingBeforeStart";
    TimerState[TimerState["WaitingAfterEnd"] = 2] = "WaitingAfterEnd";
    TimerState[TimerState["Playing"] = 3] = "Playing";
    TimerState[TimerState["Paused"] = 4] = "Paused";
    TimerState[TimerState["Finished"] = 5] = "Finished";
})(TimerState = exports.TimerState || (exports.TimerState = {}));
;
class Timer {
    getOptions() {
        return {
            delay: __classPrivateFieldGet(this, _Timer_opDelay, "f"),
            interval: __classPrivateFieldGet(this, _Timer_opInterval, "f"),
            repeat: __classPrivateFieldGet(this, _Timer_opRepeat, "f"),
            yoyo: __classPrivateFieldGet(this, _Timer_opYoyo, "f"),
            autoStart: __classPrivateFieldGet(this, _Timer_opAutoStart, "f"),
            endDelay: __classPrivateFieldGet(this, _Timer_opEndDelay, "f"),
        };
    }
    static setManager(manager) {
        window["timerManager"] = manager;
    }
    constructor(options) {
        _Timer_guid.set(this, Guid_1.Guid.getGuid());
        _Timer_eventbus.set(this, new EventBus_1.EventBus());
        // Options
        _Timer_opDelay.set(this, 0);
        _Timer_opEndDelay.set(this, 0);
        _Timer_opInterval.set(this, 0);
        _Timer_opRepeat.set(this, 0);
        _Timer_opYoyo.set(this, false);
        _Timer_opAutoStart.set(this, false);
        this.opStartTime = 0; // For timeline use
        // Runtime values
        _Timer_curElapsed.set(this, 0);
        _Timer_curRepeat.set(this, 0);
        _Timer_totalTime.set(this, 0);
        _Timer_curPosition.set(this, 0);
        _Timer_curState.set(this, TimerState.NotStarted);
        _Timer_pausedState.set(this, TimerState.NotStarted);
        _Timer_curDirection.set(this, Direction.Forward);
        _Timer_applyTick.set(this, (delta) => {
            let targetTime = __classPrivateFieldGet(this, _Timer_curElapsed, "f") + delta;
            targetTime = Math.min(targetTime, __classPrivateFieldGet(this, _Timer_totalTime, "f") + __classPrivateFieldGet(this, _Timer_opEndDelay, "f"));
            if (targetTime < 0) { // < 0 if a delay has been set
                if (__classPrivateFieldGet(this, _Timer_curState, "f") !== TimerState.WaitingBeforeStart) {
                    __classPrivateFieldSet(this, _Timer_curState, TimerState.WaitingBeforeStart, "f");
                    __classPrivateFieldGet(this, _Timer_eventbus, "f").emit("WAITING_BEFORE_START", this);
                }
                __classPrivateFieldSet(this, _Timer_curElapsed, targetTime, "f");
                return;
            }
            if ((__classPrivateFieldGet(this, _Timer_curState, "f") === TimerState.WaitingBeforeStart || __classPrivateFieldGet(this, _Timer_curState, "f") === TimerState.NotStarted) && targetTime > 0) {
                __classPrivateFieldSet(this, _Timer_curState, TimerState.Playing, "f");
                __classPrivateFieldGet(this, _Timer_eventbus, "f").emit("PLAYING", this);
                __classPrivateFieldGet(this, _Timer_eventbus, "f").emit("LOOP_START", this);
            }
            const oldDirection = __classPrivateFieldGet(this, _Timer_curDirection, "f");
            if (__classPrivateFieldGet(this, _Timer_opYoyo, "f") === true) {
                __classPrivateFieldSet(this, _Timer_curDirection, ((targetTime / __classPrivateFieldGet(this, _Timer_opInterval, "f")) >> 0) % 2 === 0
                    ? Direction.Forward
                    : Direction.Backward, "f");
            }
            __classPrivateFieldGet(this, _Timer_curState, "f") !== TimerState.WaitingAfterEnd
                && oldDirection !== __classPrivateFieldGet(this, _Timer_curDirection, "f")
                && (__classPrivateFieldGet(this, _Timer_eventbus, "f").emit("DIRECTION_CHANGED", this));
            let loopCount = ((targetTime / __classPrivateFieldGet(this, _Timer_opInterval, "f")) >> 0) - ((__classPrivateFieldGet(this, _Timer_curElapsed, "f") / __classPrivateFieldGet(this, _Timer_opInterval, "f")) >> 0);
            __classPrivateFieldSet(this, _Timer_curRepeat, __classPrivateFieldGet(this, _Timer_curRepeat, "f") + loopCount, "f");
            // End of loop
            __classPrivateFieldGet(this, _Timer_curState, "f") !== TimerState.WaitingAfterEnd
                && loopCount > 0
                && (__classPrivateFieldGet(this, _Timer_eventbus, "f").emit("LOOP_END", this), __classPrivateFieldGet(this, _Timer_curRepeat, "f") - loopCount);
            __classPrivateFieldSet(this, _Timer_curElapsed, targetTime, "f");
            let positionInInterval = __classPrivateFieldGet(this, _Timer_curDirection, "f") === Direction.Forward
                ? (targetTime % __classPrivateFieldGet(this, _Timer_opInterval, "f"))
                : __classPrivateFieldGet(this, _Timer_opInterval, "f") - (targetTime % __classPrivateFieldGet(this, _Timer_opInterval, "f"));
            if (__classPrivateFieldGet(this, _Timer_curElapsed, "f") >= __classPrivateFieldGet(this, _Timer_totalTime, "f")) {
                if (__classPrivateFieldGet(this, _Timer_curElapsed, "f") < __classPrivateFieldGet(this, _Timer_totalTime, "f") + __classPrivateFieldGet(this, _Timer_opEndDelay, "f")) {
                    if (__classPrivateFieldGet(this, _Timer_curState, "f") !== TimerState.WaitingAfterEnd) {
                        __classPrivateFieldGet(this, _Timer_eventbus, "f").emit("WAITING_AFTER_END", this);
                        __classPrivateFieldSet(this, _Timer_curState, TimerState.WaitingAfterEnd, "f");
                    }
                }
                else {
                    __classPrivateFieldSet(this, _Timer_curState, TimerState.Finished, "f");
                    if (__classPrivateFieldGet(this, _Timer_opYoyo, "f")) {
                        __classPrivateFieldSet(this, _Timer_curPosition, __classPrivateFieldGet(this, _Timer_curDirection, "f") !== Direction.Forward ? __classPrivateFieldGet(this, _Timer_opInterval, "f") : 0, "f");
                    }
                    else {
                        __classPrivateFieldSet(this, _Timer_curPosition, __classPrivateFieldGet(this, _Timer_curDirection, "f") === Direction.Forward ? __classPrivateFieldGet(this, _Timer_opInterval, "f") : 0, "f");
                    }
                    __classPrivateFieldGet(this, _Timer_eventbus, "f").emit("FINISHED", this);
                }
            }
            else {
                // New loop
                loopCount > 0 && (__classPrivateFieldGet(this, _Timer_eventbus, "f").emit("LOOP_START", this), __classPrivateFieldGet(this, _Timer_curRepeat, "f"));
            }
            __classPrivateFieldSet(this, _Timer_curPosition, positionInInterval, "f");
            return {
                elapsed: __classPrivateFieldGet(this, _Timer_curElapsed, "f"),
                direction: __classPrivateFieldGet(this, _Timer_curDirection, "f"),
                loopCount: __classPrivateFieldGet(this, _Timer_curRepeat, "f"),
                positionInInterval
            };
        });
        timerManager === null || timerManager === void 0 ? void 0 : timerManager.register(this);
        this.setOptions(options);
    }
    setOptions(options) {
        var _a, _b, _c, _d, _e, _f;
        __classPrivateFieldSet(this, _Timer_opDelay, (_a = options === null || options === void 0 ? void 0 : options.delay) !== null && _a !== void 0 ? _a : 0, "f");
        __classPrivateFieldSet(this, _Timer_opEndDelay, (_b = options === null || options === void 0 ? void 0 : options.delayAfterEnd) !== null && _b !== void 0 ? _b : 0, "f");
        __classPrivateFieldSet(this, _Timer_opInterval, (_c = options === null || options === void 0 ? void 0 : options.interval) !== null && _c !== void 0 ? _c : 0, "f");
        __classPrivateFieldSet(this, _Timer_opRepeat, (_d = options === null || options === void 0 ? void 0 : options.repeat) !== null && _d !== void 0 ? _d : 0, "f");
        __classPrivateFieldSet(this, _Timer_opYoyo, (_e = options === null || options === void 0 ? void 0 : options.yoyo) !== null && _e !== void 0 ? _e : false, "f");
        __classPrivateFieldSet(this, _Timer_opAutoStart, (_f = options === null || options === void 0 ? void 0 : options.autoStart) !== null && _f !== void 0 ? _f : false, "f");
        this.opStartTime = 0;
        this.reset();
        if (!__classPrivateFieldGet(this, _Timer_opAutoStart, "f"))
            this.pause();
    }
    /**
     * Move to the next cycle
     * @param delta The delta since the last tick in ms
     */
    tick(delta) {
        if (__classPrivateFieldGet(this, _Timer_curState, "f") === TimerState.Paused || __classPrivateFieldGet(this, _Timer_curState, "f") === TimerState.Finished)
            return;
        __classPrivateFieldGet(this, _Timer_eventbus, "f").emit("START_TICK", this);
        const result = __classPrivateFieldGet(this, _Timer_applyTick, "f").call(this, delta);
        __classPrivateFieldGet(this, _Timer_eventbus, "f").emit("END_TICK", this);
        return result;
    }
    /**
     * Move to a specific value
     * Usefull when used with the timeline
     * @param value The fixed value to go to
     */
    tack(value) {
        __classPrivateFieldSet(this, _Timer_curElapsed, value, "f");
        __classPrivateFieldGet(this, _Timer_applyTick, "f").call(this, 0);
        __classPrivateFieldGet(this, _Timer_eventbus, "f").emit("TACK", this);
    }
    /**
     * Use this instead of setTimeout
     * @param delay Delay before calling the action
     * @param handler The code to run
     */
    static once(delay, handler) {
        const timer = new Timer({ autoStart: true, interval: delay });
        return timer.once("FINISHED", handler);
    }
    /**
     * Return a new ppromise to wait for a specified amount of time
     * @param time Time to wait in ms
     * @returns Promise
     */
    static for(time) {
        return new Promise(r => Timer.once(time, () => r(0)));
    }
    /**
     * Use this instead of setInterval
     * @param delay Delay before calling the action
     * @param handler The code to run
     */
    static repeat(delay, handler, howMany = -1) {
        const timer = new Timer({ autoStart: true, interval: delay, repeat: howMany });
        return timer.on("LOOP_END", handler);
    }
    /**
     * Register to some timer events
     * @param handler Callback
     */
    on(event, handler) {
        const res = __classPrivateFieldGet(this, _Timer_eventbus, "f").on(event, handler);
        return { clear: () => res.off() };
    }
    /**
     * Register for one time to some timer events
     * @param handler Callback
     */
    once(event, handler) {
        const res = __classPrivateFieldGet(this, _Timer_eventbus, "f").on(event, handler, true);
        return { clear: () => res.off() };
    }
    /**
     * Start or resume teh timer
     */
    play() {
        if (__classPrivateFieldGet(this, _Timer_curState, "f") === TimerState.Finished)
            return;
        if (__classPrivateFieldGet(this, _Timer_curState, "f") === TimerState.Paused) {
            __classPrivateFieldSet(this, _Timer_curState, __classPrivateFieldGet(this, _Timer_pausedState, "f"), "f");
            __classPrivateFieldGet(this, _Timer_curState, "f") === TimerState.Playing && (__classPrivateFieldGet(this, _Timer_eventbus, "f").emit("PLAYING", this));
            return;
        }
        __classPrivateFieldSet(this, _Timer_curState, TimerState.Playing, "f");
    }
    /**
     * Pause the Timer
     */
    pause() {
        if (__classPrivateFieldGet(this, _Timer_curState, "f") !== TimerState.Paused && __classPrivateFieldGet(this, _Timer_curState, "f") !== TimerState.Finished) {
            __classPrivateFieldSet(this, _Timer_pausedState, __classPrivateFieldGet(this, _Timer_curState, "f"), "f");
            __classPrivateFieldSet(this, _Timer_curState, TimerState.Paused, "f");
            __classPrivateFieldGet(this, _Timer_eventbus, "f").emit("PAUSED", this);
        }
    }
    /**
     * Terminate the timer
     */
    stop() {
        if (__classPrivateFieldGet(this, _Timer_curState, "f") === TimerState.Finished)
            return;
        __classPrivateFieldSet(this, _Timer_curState, TimerState.Finished, "f");
        __classPrivateFieldGet(this, _Timer_eventbus, "f").emit("FINISHED", this);
    }
    /**
     * Reset the timer
     */
    reset() {
        __classPrivateFieldSet(this, _Timer_totalTime, __classPrivateFieldGet(this, _Timer_opInterval, "f"), "f");
        // if < 0, infinite loop is defined
        if (__classPrivateFieldGet(this, _Timer_opRepeat, "f") < 0) {
            __classPrivateFieldSet(this, _Timer_opRepeat, (MAX_TIME / __classPrivateFieldGet(this, _Timer_opInterval, "f")) >> 0, "f");
            __classPrivateFieldSet(this, _Timer_totalTime, MAX_TIME, "f");
        }
        else {
            __classPrivateFieldSet(this, _Timer_totalTime, __classPrivateFieldGet(this, _Timer_totalTime, "f") + __classPrivateFieldGet(this, _Timer_opInterval, "f") * __classPrivateFieldGet(this, _Timer_opRepeat, "f"), "f");
        }
        __classPrivateFieldSet(this, _Timer_curElapsed, -__classPrivateFieldGet(this, _Timer_opDelay, "f"), "f");
        __classPrivateFieldSet(this, _Timer_curState, TimerState.NotStarted, "f");
        __classPrivateFieldGet(this, _Timer_eventbus, "f").emit("RESET", this);
    }
    setDirection(direction) {
        __classPrivateFieldSet(this, _Timer_curDirection, direction === 1 ? 1 : 0, "f");
    }
    get id() {
        return __classPrivateFieldGet(this, _Timer_guid, "f");
    }
    dispose() {
        timerManager.unregister(this);
        __classPrivateFieldGet(this, _Timer_eventbus, "f").clear();
    }
    get state() {
        return __classPrivateFieldGet(this, _Timer_curState, "f");
    }
    get timeInInterval() {
        return __classPrivateFieldGet(this, _Timer_curPosition, "f");
    }
    get elapsedTime() {
        return __classPrivateFieldGet(this, _Timer_curElapsed, "f");
    }
    get currentLoop() {
        return __classPrivateFieldGet(this, _Timer_curRepeat, "f");
    }
}
exports.Timer = Timer;
_Timer_guid = new WeakMap(), _Timer_eventbus = new WeakMap(), _Timer_opDelay = new WeakMap(), _Timer_opEndDelay = new WeakMap(), _Timer_opInterval = new WeakMap(), _Timer_opRepeat = new WeakMap(), _Timer_opYoyo = new WeakMap(), _Timer_opAutoStart = new WeakMap(), _Timer_curElapsed = new WeakMap(), _Timer_curRepeat = new WeakMap(), _Timer_totalTime = new WeakMap(), _Timer_curPosition = new WeakMap(), _Timer_curState = new WeakMap(), _Timer_pausedState = new WeakMap(), _Timer_curDirection = new WeakMap(), _Timer_applyTick = new WeakMap();
