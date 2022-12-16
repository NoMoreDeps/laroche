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
    exports.startProjectSlider = exports.InitializeAppConfiguration = void 0;
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
    }
    exports.startProjectSlider = startProjectSlider;
  }
});
export default require_App();
