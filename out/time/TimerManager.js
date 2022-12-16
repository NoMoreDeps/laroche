"use strict";
/**
 * Part of Moon library under the MIT license
 */
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _TimerManager_timers;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimerManager = void 0;
class TimerManager {
    constructor() {
        _TimerManager_timers.set(this, new Map());
    }
    register(timer) {
        __classPrivateFieldGet(this, _TimerManager_timers, "f").set(timer.id, (_) => timer.tick(_));
    }
    unregister(timerIdentifier) {
        const id = typeof timerIdentifier === "string" ? timerIdentifier : timerIdentifier.id;
        __classPrivateFieldGet(this, _TimerManager_timers, "f").delete(id);
    }
    tick(delta) {
        for (const timer of __classPrivateFieldGet(this, _TimerManager_timers, "f").values()) {
            timer(delta);
        }
    }
}
exports.TimerManager = TimerManager;
_TimerManager_timers = new WeakMap();
