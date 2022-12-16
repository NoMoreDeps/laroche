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
var _EventBus_events;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventBus = void 0;
const Guid_1 = require("../utils/Guid");
class EventBus {
    constructor() {
        _EventBus_events.set(this, new Map());
    }
    on(eventName, callback, once = false) {
        !__classPrivateFieldGet(this, _EventBus_events, "f").has(eventName)
            && __classPrivateFieldGet(this, _EventBus_events, "f").set(eventName, new Map());
        const fullHandler = { id: Guid_1.Guid.getGuid(), callback, once };
        __classPrivateFieldGet(this, _EventBus_events, "f").get(eventName).set(fullHandler.id, fullHandler);
        return {
            id: fullHandler.id,
            off: () => { var _a; return (_a = __classPrivateFieldGet(this, _EventBus_events, "f").get(eventName)) === null || _a === void 0 ? void 0 : _a.delete(fullHandler.id); }
        };
    }
    ;
    emit(eventName, data) {
        var _a;
        (_a = __classPrivateFieldGet(this, _EventBus_events, "f").get(eventName)) === null || _a === void 0 ? void 0 : _a.forEach((v, k, m) => {
            v.callback(data);
            v.once && m.delete(k);
        });
    }
    clear() {
        __classPrivateFieldSet(this, _EventBus_events, new Map(), "f");
    }
}
exports.EventBus = EventBus;
_EventBus_events = new WeakMap();
