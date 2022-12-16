"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prevProjectSlide = exports.nextProjectSlide = exports.startProjectSlider = exports.InitializeAppConfiguration = void 0;
/**
 * This file should include all initializations
 */
const AnimationBuilder_1 = require("./animation/AnimationBuilder");
const Easing_1 = require("./animation/Easing");
const Timer_1 = require("./time/Timer");
const TimerManager_1 = require("./time/TimerManager");
/**
 * Timer initialization
 */
const timerManager = new TimerManager_1.TimerManager();
Timer_1.Timer.setManager(timerManager);
let lastTimeStamp = 0;
let currentDelta = 0;
function nextFrame(timeStamp) {
    // We register for next frame
    requestAnimationFrame(nextFrame);
    currentDelta = (timeStamp - lastTimeStamp);
    lastTimeStamp = timeStamp;
    currentDelta > 200 && (currentDelta = 200);
    timerManager.tick(currentDelta);
}
// We start the global loop
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
    builder
        .setTargets("slides", slide4.style, slide2.style, slide3.style)
        .select("slides")
        .props({
        opacity: "0",
    })
        .build().play();
    /*Timer.repeat(5000, () => {
      nextProjectSlide();
    });*/
}
exports.startProjectSlider = startProjectSlider;
let slider = 0;
function nextProjectSlide() {
    const prev = document.querySelector(".slide" + (slider + 1));
    slider = slider === 3 ? 0 : slider + 1;
    const next = document.querySelector(".slide" + (slider + 1));
    new AnimationBuilder_1.AnimationBuilder()
        .setTargets("prev", prev.style)
        .setTargets("next", next.style)
        .select("prev")
        .tween({
        duration: 1000,
        easing: Easing_1.Easing.easeInOutCubic,
        props: {
            opacity: {
                from: 1,
                to: 0,
            },
        }
    })
        .select("next")
        .tween({
        duration: 1000,
        easing: Easing_1.Easing.easeInOutCubic,
        props: {
            opacity: {
                from: 0,
                to: 1,
            },
        }
    })
        .build().play();
}
exports.nextProjectSlide = nextProjectSlide;
function prevProjectSlide() {
    const prev = document.querySelector(".slide" + (slider + 1));
    slider = slider === 0 ? 3 : slider - 1;
    const next = document.querySelector(".slide" + (slider + 1));
    new AnimationBuilder_1.AnimationBuilder()
        .setTargets("prev", prev.style)
        .setTargets("next", next.style)
        .select("prev")
        .tween({
        duration: 1000,
        easing: Easing_1.Easing.easeInOutCubic,
        props: {
            opacity: {
                from: 1,
                to: 0,
            },
        }
    })
        .select("next")
        .tween({
        duration: 1000,
        easing: Easing_1.Easing.easeInOutCubic,
        props: {
            opacity: {
                from: 0,
                to: 1,
            },
        }
    })
        .build().play();
}
exports.prevProjectSlide = prevProjectSlide;
