var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// out/core/utils/Guid.js
var require_Guid = __commonJS({
  "out/core/utils/Guid.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Guid = void 0;
    var Guid = class {
      static generate2bytesNumber() {
        const res = Math.round(Math.random() * 65535);
        return [res, Guid.pad(res.toString(16), 4)];
      }
      static generate4bytesNumber() {
        const res = Math.round(Math.random() * 4294967295);
        return [res, Guid.pad(res.toString(16), 8)];
      }
      static generate6bytesNumber() {
        const res = Math.round(Math.random() * 281474976710655);
        return [res, Guid.pad(res.toString(16), 12)];
      }
      static pad(txt, size) {
        var pad = "";
        for (let i = 0; i < size; i++) {
          pad += "0";
        }
        return (pad + txt).substr(-size);
      }
      constructor() {
        const [part1, strPart1] = Guid.generate4bytesNumber();
        const [part2, strPart2] = Guid.generate2bytesNumber();
        const [part3, strPart3] = Guid.generate2bytesNumber();
        const [part4, strPart4] = Guid.generate2bytesNumber();
        const [part5, strPart5] = Guid.generate6bytesNumber();
        this._Guid_ = {
          part1,
          part2,
          part3,
          part4,
          part5,
          toString: `${strPart1}-${strPart2}-${strPart3}-${strPart4}-${strPart5}`
        };
      }
      get part1() {
        return this._Guid_.part1;
      }
      get part2() {
        return this._Guid_.part2;
      }
      get part3() {
        return this._Guid_.part3;
      }
      get part4() {
        return this._Guid_.part4;
      }
      get part5() {
        return this._Guid_.part5;
      }
      toString() {
        return this._Guid_.toString;
      }
      static getGuid() {
        return new Guid().toString();
      }
    };
    exports.Guid = Guid;
  }
});

// out/core/event/EventBus.js
var require_EventBus = __commonJS({
  "out/core/event/EventBus.js"(exports) {
    "use strict";
    var __classPrivateFieldGet = exports && exports.__classPrivateFieldGet || function(receiver, state, kind, f) {
      if (kind === "a" && !f)
        throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
        throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
    var __classPrivateFieldSet = exports && exports.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
      if (kind === "m")
        throw new TypeError("Private method is not writable");
      if (kind === "a" && !f)
        throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
        throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
    };
    var _EventBus_events;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EventBus = void 0;
    var Guid_1 = require_Guid();
    var EventBus = class {
      constructor() {
        _EventBus_events.set(this, /* @__PURE__ */ new Map());
      }
      on(eventName, callback, once = false) {
        !__classPrivateFieldGet(this, _EventBus_events, "f").has(eventName) && __classPrivateFieldGet(this, _EventBus_events, "f").set(eventName, /* @__PURE__ */ new Map());
        const fullHandler = { id: Guid_1.Guid.getGuid(), callback, once };
        __classPrivateFieldGet(this, _EventBus_events, "f").get(eventName).set(fullHandler.id, fullHandler);
        return {
          id: fullHandler.id,
          off: () => {
            var _a;
            return (_a = __classPrivateFieldGet(this, _EventBus_events, "f").get(eventName)) === null || _a === void 0 ? void 0 : _a.delete(fullHandler.id);
          }
        };
      }
      emit(eventName, data) {
        var _a;
        (_a = __classPrivateFieldGet(this, _EventBus_events, "f").get(eventName)) === null || _a === void 0 ? void 0 : _a.forEach((v, k, m) => {
          v.callback(data);
          v.once && m.delete(k);
        });
      }
      clear() {
        __classPrivateFieldSet(this, _EventBus_events, /* @__PURE__ */ new Map(), "f");
      }
    };
    exports.EventBus = EventBus;
    _EventBus_events = /* @__PURE__ */ new WeakMap();
  }
});

// out/time/Timer.js
var require_Timer = __commonJS({
  "out/time/Timer.js"(exports) {
    "use strict";
    var __classPrivateFieldGet = exports && exports.__classPrivateFieldGet || function(receiver, state, kind, f) {
      if (kind === "a" && !f)
        throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
        throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
    var __classPrivateFieldSet = exports && exports.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
      if (kind === "m")
        throw new TypeError("Private method is not writable");
      if (kind === "a" && !f)
        throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
        throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
    };
    var _Timer_guid;
    var _Timer_eventbus;
    var _Timer_opDelay;
    var _Timer_opEndDelay;
    var _Timer_opInterval;
    var _Timer_opRepeat;
    var _Timer_opYoyo;
    var _Timer_opAutoStart;
    var _Timer_curElapsed;
    var _Timer_curRepeat;
    var _Timer_totalTime;
    var _Timer_curPosition;
    var _Timer_curState;
    var _Timer_pausedState;
    var _Timer_curDirection;
    var _Timer_applyTick;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Timer = exports.TimerState = exports.Direction = void 0;
    var EventBus_1 = require_EventBus();
    var Guid_1 = require_Guid();
    var MAX_TIME = 315576e7;
    var Direction;
    (function(Direction2) {
      Direction2[Direction2["Backward"] = 0] = "Backward";
      Direction2[Direction2["Forward"] = 1] = "Forward";
    })(Direction = exports.Direction || (exports.Direction = {}));
    var TimerState;
    (function(TimerState2) {
      TimerState2[TimerState2["NotStarted"] = 0] = "NotStarted";
      TimerState2[TimerState2["WaitingBeforeStart"] = 1] = "WaitingBeforeStart";
      TimerState2[TimerState2["WaitingAfterEnd"] = 2] = "WaitingAfterEnd";
      TimerState2[TimerState2["Playing"] = 3] = "Playing";
      TimerState2[TimerState2["Paused"] = 4] = "Paused";
      TimerState2[TimerState2["Finished"] = 5] = "Finished";
    })(TimerState = exports.TimerState || (exports.TimerState = {}));
    var Timer = class {
      getOptions() {
        return {
          delay: __classPrivateFieldGet(this, _Timer_opDelay, "f"),
          interval: __classPrivateFieldGet(this, _Timer_opInterval, "f"),
          repeat: __classPrivateFieldGet(this, _Timer_opRepeat, "f"),
          yoyo: __classPrivateFieldGet(this, _Timer_opYoyo, "f"),
          autoStart: __classPrivateFieldGet(this, _Timer_opAutoStart, "f"),
          endDelay: __classPrivateFieldGet(this, _Timer_opEndDelay, "f")
        };
      }
      static setManager(manager) {
        window["timerManager"] = manager;
      }
      constructor(options) {
        _Timer_guid.set(this, Guid_1.Guid.getGuid());
        _Timer_eventbus.set(this, new EventBus_1.EventBus());
        _Timer_opDelay.set(this, 0);
        _Timer_opEndDelay.set(this, 0);
        _Timer_opInterval.set(this, 0);
        _Timer_opRepeat.set(this, 0);
        _Timer_opYoyo.set(this, false);
        _Timer_opAutoStart.set(this, false);
        this.opStartTime = 0;
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
          if (targetTime < 0) {
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
            __classPrivateFieldSet(this, _Timer_curDirection, (targetTime / __classPrivateFieldGet(this, _Timer_opInterval, "f") >> 0) % 2 === 0 ? Direction.Forward : Direction.Backward, "f");
          }
          __classPrivateFieldGet(this, _Timer_curState, "f") !== TimerState.WaitingAfterEnd && oldDirection !== __classPrivateFieldGet(this, _Timer_curDirection, "f") && __classPrivateFieldGet(this, _Timer_eventbus, "f").emit("DIRECTION_CHANGED", this);
          let loopCount = (targetTime / __classPrivateFieldGet(this, _Timer_opInterval, "f") >> 0) - (__classPrivateFieldGet(this, _Timer_curElapsed, "f") / __classPrivateFieldGet(this, _Timer_opInterval, "f") >> 0);
          __classPrivateFieldSet(this, _Timer_curRepeat, __classPrivateFieldGet(this, _Timer_curRepeat, "f") + loopCount, "f");
          __classPrivateFieldGet(this, _Timer_curState, "f") !== TimerState.WaitingAfterEnd && loopCount > 0 && (__classPrivateFieldGet(this, _Timer_eventbus, "f").emit("LOOP_END", this), __classPrivateFieldGet(this, _Timer_curRepeat, "f") - loopCount);
          __classPrivateFieldSet(this, _Timer_curElapsed, targetTime, "f");
          let positionInInterval = __classPrivateFieldGet(this, _Timer_curDirection, "f") === Direction.Forward ? targetTime % __classPrivateFieldGet(this, _Timer_opInterval, "f") : __classPrivateFieldGet(this, _Timer_opInterval, "f") - targetTime % __classPrivateFieldGet(this, _Timer_opInterval, "f");
          if (__classPrivateFieldGet(this, _Timer_curElapsed, "f") >= __classPrivateFieldGet(this, _Timer_totalTime, "f")) {
            if (__classPrivateFieldGet(this, _Timer_curElapsed, "f") < __classPrivateFieldGet(this, _Timer_totalTime, "f") + __classPrivateFieldGet(this, _Timer_opEndDelay, "f")) {
              if (__classPrivateFieldGet(this, _Timer_curState, "f") !== TimerState.WaitingAfterEnd) {
                __classPrivateFieldGet(this, _Timer_eventbus, "f").emit("WAITING_AFTER_END", this);
                __classPrivateFieldSet(this, _Timer_curState, TimerState.WaitingAfterEnd, "f");
              }
            } else {
              __classPrivateFieldSet(this, _Timer_curState, TimerState.Finished, "f");
              if (__classPrivateFieldGet(this, _Timer_opYoyo, "f")) {
                __classPrivateFieldSet(this, _Timer_curPosition, __classPrivateFieldGet(this, _Timer_curDirection, "f") !== Direction.Forward ? __classPrivateFieldGet(this, _Timer_opInterval, "f") : 0, "f");
              } else {
                __classPrivateFieldSet(this, _Timer_curPosition, __classPrivateFieldGet(this, _Timer_curDirection, "f") === Direction.Forward ? __classPrivateFieldGet(this, _Timer_opInterval, "f") : 0, "f");
              }
              __classPrivateFieldGet(this, _Timer_eventbus, "f").emit("FINISHED", this);
            }
          } else {
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
      tick(delta) {
        if (__classPrivateFieldGet(this, _Timer_curState, "f") === TimerState.Paused || __classPrivateFieldGet(this, _Timer_curState, "f") === TimerState.Finished)
          return;
        __classPrivateFieldGet(this, _Timer_eventbus, "f").emit("START_TICK", this);
        const result = __classPrivateFieldGet(this, _Timer_applyTick, "f").call(this, delta);
        __classPrivateFieldGet(this, _Timer_eventbus, "f").emit("END_TICK", this);
        return result;
      }
      tack(value) {
        __classPrivateFieldSet(this, _Timer_curElapsed, value, "f");
        __classPrivateFieldGet(this, _Timer_applyTick, "f").call(this, 0);
        __classPrivateFieldGet(this, _Timer_eventbus, "f").emit("TACK", this);
      }
      static once(delay, handler) {
        const timer = new Timer({ autoStart: true, interval: delay });
        return timer.once("FINISHED", handler);
      }
      static for(time) {
        return new Promise((r) => Timer.once(time, () => r(0)));
      }
      static repeat(delay, handler, howMany = -1) {
        const timer = new Timer({ autoStart: true, interval: delay, repeat: howMany });
        return timer.on("LOOP_END", handler);
      }
      on(event, handler) {
        const res = __classPrivateFieldGet(this, _Timer_eventbus, "f").on(event, handler);
        return { clear: () => res.off() };
      }
      once(event, handler) {
        const res = __classPrivateFieldGet(this, _Timer_eventbus, "f").on(event, handler, true);
        return { clear: () => res.off() };
      }
      play() {
        if (__classPrivateFieldGet(this, _Timer_curState, "f") === TimerState.Finished)
          return;
        if (__classPrivateFieldGet(this, _Timer_curState, "f") === TimerState.Paused) {
          __classPrivateFieldSet(this, _Timer_curState, __classPrivateFieldGet(this, _Timer_pausedState, "f"), "f");
          __classPrivateFieldGet(this, _Timer_curState, "f") === TimerState.Playing && __classPrivateFieldGet(this, _Timer_eventbus, "f").emit("PLAYING", this);
          return;
        }
        __classPrivateFieldSet(this, _Timer_curState, TimerState.Playing, "f");
      }
      pause() {
        if (__classPrivateFieldGet(this, _Timer_curState, "f") !== TimerState.Paused && __classPrivateFieldGet(this, _Timer_curState, "f") !== TimerState.Finished) {
          __classPrivateFieldSet(this, _Timer_pausedState, __classPrivateFieldGet(this, _Timer_curState, "f"), "f");
          __classPrivateFieldSet(this, _Timer_curState, TimerState.Paused, "f");
          __classPrivateFieldGet(this, _Timer_eventbus, "f").emit("PAUSED", this);
        }
      }
      stop() {
        if (__classPrivateFieldGet(this, _Timer_curState, "f") === TimerState.Finished)
          return;
        __classPrivateFieldSet(this, _Timer_curState, TimerState.Finished, "f");
        __classPrivateFieldGet(this, _Timer_eventbus, "f").emit("FINISHED", this);
      }
      reset() {
        __classPrivateFieldSet(this, _Timer_totalTime, __classPrivateFieldGet(this, _Timer_opInterval, "f"), "f");
        if (__classPrivateFieldGet(this, _Timer_opRepeat, "f") < 0) {
          __classPrivateFieldSet(this, _Timer_opRepeat, MAX_TIME / __classPrivateFieldGet(this, _Timer_opInterval, "f") >> 0, "f");
          __classPrivateFieldSet(this, _Timer_totalTime, MAX_TIME, "f");
        } else {
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
    };
    exports.Timer = Timer;
    _Timer_guid = /* @__PURE__ */ new WeakMap(), _Timer_eventbus = /* @__PURE__ */ new WeakMap(), _Timer_opDelay = /* @__PURE__ */ new WeakMap(), _Timer_opEndDelay = /* @__PURE__ */ new WeakMap(), _Timer_opInterval = /* @__PURE__ */ new WeakMap(), _Timer_opRepeat = /* @__PURE__ */ new WeakMap(), _Timer_opYoyo = /* @__PURE__ */ new WeakMap(), _Timer_opAutoStart = /* @__PURE__ */ new WeakMap(), _Timer_curElapsed = /* @__PURE__ */ new WeakMap(), _Timer_curRepeat = /* @__PURE__ */ new WeakMap(), _Timer_totalTime = /* @__PURE__ */ new WeakMap(), _Timer_curPosition = /* @__PURE__ */ new WeakMap(), _Timer_curState = /* @__PURE__ */ new WeakMap(), _Timer_pausedState = /* @__PURE__ */ new WeakMap(), _Timer_curDirection = /* @__PURE__ */ new WeakMap(), _Timer_applyTick = /* @__PURE__ */ new WeakMap();
  }
});

// out/animation/AnimationRunner.js
var require_AnimationRunner = __commonJS({
  "out/animation/AnimationRunner.js"(exports) {
    "use strict";
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AnimationRunner = void 0;
    var AnimationRunner = class {
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
            this._curSteps = this._steps.filter((_) => _());
          }
          if (this._state === "PAUSED") {
            this._tweens.forEach((_) => _.play());
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
            const promises = this._tweens.map((_) => _.asyncComplete());
            yield Promise.all(promises);
            yield Promise.all(this._doAsync);
            this._state = "ENDED";
          }
        });
      }
      pause() {
        this._state = "PAUSED";
        this._tweens.forEach((_) => _.pause());
      }
      stop() {
        this._state = "STOPPED";
        this._curSteps.length = 0;
        this._tweens.forEach((_) => {
          try {
            _.stop();
          } catch (_ex) {
          }
        });
        this._tweens.length = 0;
      }
      dispose() {
        this._tweens.forEach((_) => _.dispose());
        this._tweens.length = 0;
        this._curSteps.length = 0;
        this._doAsync.length = 0;
        this._curTargets.length = 0;
      }
    };
    exports.AnimationRunner = AnimationRunner;
  }
});

// out/animation/Easing.js
var require_Easing = __commonJS({
  "out/animation/Easing.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Easing = void 0;
    function easeLinear(t, b, c, d) {
      return c * t / d + b;
    }
    function easeInQuad(t, b, c, d) {
      return c * (t /= d) * t + b;
    }
    function easeOutQuad(t, b, c, d) {
      return -c * (t /= d) * (t - 2) + b;
    }
    function easeInOutQuad(t, b, c, d) {
      if ((t /= d / 2) < 1)
        return c / 2 * t * t + b;
      return -c / 2 * (--t * (t - 2) - 1) + b;
    }
    function easeInSine(t, b, c, d) {
      return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    }
    function easeOutSine(t, b, c, d) {
      return c * Math.sin(t / d * (Math.PI / 2)) + b;
    }
    function easeInOutSine(t, b, c, d) {
      return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    }
    function easeInExpo(t, b, c, d) {
      return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    }
    function easeOutExpo(t, b, c, d) {
      return t == d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    }
    function easeInOutExpo(t, b, c, d) {
      if (t == 0)
        return b;
      if (t == d)
        return b + c;
      if ((t /= d / 2) < 1)
        return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
      return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    }
    function easeInCirc(t, b, c, d) {
      return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    }
    function easeOutCirc(t, b, c, d) {
      return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    }
    function easeInOutCirc(t, b, c, d) {
      if ((t /= d / 2) < 1)
        return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
      return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    }
    function easeInCubic(t, b, c, d) {
      return c * (t /= d) * t * t + b;
    }
    function easeOutCubic(t, b, c, d) {
      return c * ((t = t / d - 1) * t * t + 1) + b;
    }
    function easeInOutCubic(t, b, c, d) {
      if ((t /= d / 2) < 1)
        return c / 2 * t * t * t + b;
      return c / 2 * ((t -= 2) * t * t + 2) + b;
    }
    function easeInQuart(t, b, c, d) {
      return c * (t /= d) * t * t * t + b;
    }
    function easeOutQuart(t, b, c, d) {
      return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    }
    function easeInOutQuart(t, b, c, d) {
      if ((t /= d / 2) < 1)
        return c / 2 * t * t * t * t + b;
      return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    }
    function easeInQuint(t, b, c, d) {
      return c * (t /= d) * t * t * t * t + b;
    }
    function easeOutQuint(t, b, c, d) {
      return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    }
    function easeInOutQuint(t, b, c, d) {
      if ((t /= d / 2) < 1)
        return c / 2 * t * t * t * t * t + b;
      return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    }
    function easeInElastic(t, b, c, d) {
      var s = 1.70158;
      var p = 0;
      var a = c;
      if (t == 0)
        return b;
      if ((t /= d) == 1)
        return b + c;
      if (!p)
        p = d * 0.3;
      if (a < Math.abs(c)) {
        a = c;
        var s = p / 4;
      } else
        var s = p / (2 * Math.PI) * Math.asin(c / a);
      return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    }
    function easeOutElastic(t, b, c, d) {
      var s = 1.70158;
      var p = 0;
      var a = c;
      if (t == 0)
        return b;
      if ((t /= d) == 1)
        return b + c;
      if (!p)
        p = d * 0.3;
      if (a < Math.abs(c)) {
        a = c;
        var s = p / 4;
      } else
        var s = p / (2 * Math.PI) * Math.asin(c / a);
      return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    }
    function easeInOutElastic(t, b, c, d) {
      var s = 1.70158;
      var p = 0;
      var a = c;
      if (t == 0)
        return b;
      if ((t /= d / 2) == 2)
        return b + c;
      if (!p)
        p = d * (0.3 * 1.5);
      if (a < Math.abs(c)) {
        a = c;
        var s = p / 4;
      } else
        var s = p / (2 * Math.PI) * Math.asin(c / a);
      if (t < 1)
        return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
      return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
    }
    function easeInBack(t, b, c, d) {
      const s = 1.70158;
      return c * (t /= d) * t * ((s + 1) * t - s) + b;
    }
    function easeOutBack(t, b, c, d) {
      const s = 1.70158;
      return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    }
    function easeInOutBack(t, b, c, d) {
      let s = 1.70158;
      if ((t /= d / 2) < 1)
        return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
      return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
    }
    exports.Easing = {
      easeLinear,
      easeInQuad,
      easeOutQuad,
      easeInOutQuad,
      easeInSine,
      easeOutSine,
      easeInOutSine,
      easeInExpo,
      easeOutExpo,
      easeInOutExpo,
      easeInCirc,
      easeOutCirc,
      easeInOutCirc,
      easeInCubic,
      easeOutCubic,
      easeInOutCubic,
      easeInQuart,
      easeOutQuart,
      easeInOutQuart,
      easeInQuint,
      easeOutQuint,
      easeInOutQuint,
      easeInElastic,
      easeOutElastic,
      easeInOutElastic,
      easeInBack,
      easeOutBack,
      easeInOutBack
    };
  }
});

// out/animation/Tween.js
var require_Tween = __commonJS({
  "out/animation/Tween.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Tween = void 0;
    var Timer_1 = require_Timer();
    var EventBus_1 = require_EventBus();
    var Easing_1 = require_Easing();
    var Tween = class {
      constructor(options) {
        this._eventBus = new EventBus_1.EventBus();
        this._disposed = false;
        this._options = options;
        this._sources = [];
        this._props = /* @__PURE__ */ new Map();
        this._tpmTargets = [];
        this._timer = new Timer_1.Timer({
          interval: options.duration,
          yoyo: options.yoyo,
          repeat: options.repeat
        });
        this.setProps(options.props);
      }
      setProps(props) {
        if (this._disposed)
          return;
        if (!(this._timer.state === Timer_1.TimerState.NotStarted || this._timer.state === Timer_1.TimerState.Finished || this._timer.state === Timer_1.TimerState.Paused))
          return;
        this._props = /* @__PURE__ */ new Map();
        for (const prop in props) {
          this._props.set(prop, props[prop]);
        }
      }
      applyTo(sources) {
        if (this._disposed)
          return this;
        if (this._timer.state === Timer_1.TimerState.NotStarted || this._timer.state === Timer_1.TimerState.Finished || this._timer.state === Timer_1.TimerState.Paused) {
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
              var _a2, _b2;
              const _from = v.from !== void 0 ? v.from : v.converter ? (_b2 = (_a2 = v.converter) === null || _a2 === void 0 ? void 0 : _a2.read) === null || _b2 === void 0 ? void 0 : _b2.call(_a2, _[k]) : _[k];
              this._tpmTargets.push({
                target: _,
                from: _from,
                prop: k,
                to: v.to - _from
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
        } catch (ex) {
          this.stop();
        }
        return this;
      }
      updateRender() {
        if (this._disposed)
          return;
        try {
          const value = this._timer.timeInInterval;
          this._tpmTargets.forEach((_) => {
            var _a, _b, _c, _d;
            const easingFunction = (_a = this._options.easing) !== null && _a !== void 0 ? _a : Easing_1.Easing.easeLinear;
            const newValue = easingFunction(value, _.from, _.to, this._options.duration);
            ((_b = this._props.get(_.prop)) === null || _b === void 0 ? void 0 : _b.converter) ? _.target[_.prop] = (_d = (_c = this._props.get(_.prop)) === null || _c === void 0 ? void 0 : _c.converter) === null || _d === void 0 ? void 0 : _d.write(newValue) : _.target[_.prop] = newValue;
          });
        } catch (ex) {
          this.stop();
          this.dispose();
        }
      }
      on(eventName, handler) {
        const res = this._eventBus.on(eventName, handler);
        return { clear: () => res.off() };
      }
      asyncComplete() {
        return new Promise((r) => this._timer.once("FINISHED", (_) => r()));
      }
      dispose() {
        delete this["_options"];
        delete this["_props"];
        this._sources.length = 0;
        this._props = /* @__PURE__ */ new Map();
        this._tpmTargets.length = 0;
        ;
        this._timer.dispose();
      }
    };
    exports.Tween = Tween;
  }
});

// out/animation/AnimationBuilder.js
var require_AnimationBuilder = __commonJS({
  "out/animation/AnimationBuilder.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AnimationBuilder = void 0;
    var Timer_1 = require_Timer();
    var AnimationRunner_1 = require_AnimationRunner();
    var Tween_1 = require_Tween();
    var AnimationBuilder = class {
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
          step.data.forEach((_) => {
            const tgs = Array.isArray(this._targets[_]) ? this._targets[_] : [this._targets[_]];
            targets.push(...tgs);
          });
          return () => ({ type: "SELECT", data: targets });
        }
        if ((step === null || step === void 0 ? void 0 : step.type) === "TWEEN") {
          return () => ({ type: "TWEEN", data: (targets) => new Tween_1.Tween(step.data).applyTo(targets) });
        }
        if ((step === null || step === void 0 ? void 0 : step.type) === "APPLY_PROPS") {
          return () => ({ type: "APPLY_PROPS", data: (targets) => targets.forEach((target) => {
            Object.keys(step.data).forEach((keyProp) => {
              typeof target[keyProp] === "function" ? target[keyProp](...step.data[keyProp]) : target[keyProp] = step.data[keyProp];
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
        return () => (step === null || step === void 0 ? void 0 : step.data) ? { type: "NEXT", data: step.data } : { type: "NEXT" };
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
          this._steps.push({
            type: "NEXT",
            data: () => ({ asyncComplete: () => new Promise((r) => Timer_1.Timer.once(wait, () => r())) })
          });
        }
        this._steps.push({
          type: "NEXT",
          data: () => ({ asyncComplete: () => new Promise((r) => r()) })
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
    };
    exports.AnimationBuilder = AnimationBuilder;
  }
});

// out/time/TimerManager.js
var require_TimerManager = __commonJS({
  "out/time/TimerManager.js"(exports) {
    "use strict";
    var __classPrivateFieldGet = exports && exports.__classPrivateFieldGet || function(receiver, state, kind, f) {
      if (kind === "a" && !f)
        throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
        throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
    var _TimerManager_timers;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TimerManager = void 0;
    var TimerManager = class {
      constructor() {
        _TimerManager_timers.set(this, /* @__PURE__ */ new Map());
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
    };
    exports.TimerManager = TimerManager;
    _TimerManager_timers = /* @__PURE__ */ new WeakMap();
  }
});

// out/App.js
var require_App = __commonJS({
  "out/App.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.prevProjectSlide = exports.nextProjectSlide = exports.startProjectSlider = exports.InitializeAppConfiguration = void 0;
    var AnimationBuilder_1 = require_AnimationBuilder();
    var Easing_1 = require_Easing();
    var Timer_1 = require_Timer();
    var TimerManager_1 = require_TimerManager();
    var timerManager2 = new TimerManager_1.TimerManager();
    Timer_1.Timer.setManager(timerManager2);
    var lastTimeStamp = 0;
    var currentDelta = 0;
    function nextFrame(timeStamp) {
      requestAnimationFrame(nextFrame);
      currentDelta = timeStamp - lastTimeStamp;
      lastTimeStamp = timeStamp;
      currentDelta > 200 && (currentDelta = 200);
      timerManager2.tick(currentDelta);
    }
    function InitializeAppConfiguration() {
      requestAnimationFrame(nextFrame);
    }
    exports.InitializeAppConfiguration = InitializeAppConfiguration;
    function startProjectSlider() {
      const slide1 = document.querySelector(".slide1");
      const slide2 = document.querySelector(".slide2");
      const slide3 = document.querySelector(".slide3");
      const slide4 = document.querySelector(".slide4");
      slide1.style.backgroundImage = "url(./img/1.jpg)";
      slide2.style.backgroundImage = "url(./img/2.jpg)";
      slide3.style.backgroundImage = "url(./img/3.jpg)";
      slide4.style.backgroundImage = "url(./img/4.jpg)";
      const builder = new AnimationBuilder_1.AnimationBuilder();
      builder.setTargets("slides", slide4.style, slide2.style, slide3.style).select("slides").props({
        opacity: "0"
      }).build().play();
    }
    exports.startProjectSlider = startProjectSlider;
    var slider = 0;
    function nextProjectSlide() {
      const prev = document.querySelector(".slide" + (slider + 1));
      slider = slider === 3 ? 0 : slider + 1;
      const next = document.querySelector(".slide" + (slider + 1));
      new AnimationBuilder_1.AnimationBuilder().setTargets("prev", prev.style).setTargets("next", next.style).select("prev").tween({
        duration: 1e3,
        easing: Easing_1.Easing.easeInOutCubic,
        props: {
          opacity: {
            from: 1,
            to: 0
          }
        }
      }).select("next").tween({
        duration: 1e3,
        easing: Easing_1.Easing.easeInOutCubic,
        props: {
          opacity: {
            from: 0,
            to: 1
          }
        }
      }).build().play();
    }
    exports.nextProjectSlide = nextProjectSlide;
    function prevProjectSlide() {
      const prev = document.querySelector(".slide" + (slider + 1));
      slider = slider === 0 ? 3 : slider - 1;
      const next = document.querySelector(".slide" + (slider + 1));
      new AnimationBuilder_1.AnimationBuilder().setTargets("prev", prev.style).setTargets("next", next.style).select("prev").tween({
        duration: 1e3,
        easing: Easing_1.Easing.easeInOutCubic,
        props: {
          opacity: {
            from: 1,
            to: 0
          }
        }
      }).select("next").tween({
        duration: 1e3,
        easing: Easing_1.Easing.easeInOutCubic,
        props: {
          opacity: {
            from: 0,
            to: 1
          }
        }
      }).build().play();
    }
    exports.prevProjectSlide = prevProjectSlide;
  }
});
export default require_App();
