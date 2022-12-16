/**
 * This file should include all initializations
 */
import { AnimationBuilder } from "./animation/AnimationBuilder";
import { Easing } from "./animation/Easing";
import { Timer } from "./time/Timer";
import { TimerManager } from "./time/TimerManager";

/**
 * Timer initialization
 */
const timerManager = new TimerManager();
Timer.setManager(timerManager);

let lastTimeStamp = 0;
let currentDelta  = 0;

function nextFrame(timeStamp: number) {
  // We register for next frame
  requestAnimationFrame(nextFrame);

  currentDelta  = (timeStamp - lastTimeStamp);
  lastTimeStamp = timeStamp;
  currentDelta > 200 && (currentDelta = 200);
  timerManager.tick(currentDelta);
}

// We start the global loop
export function InitializeAppConfiguration() {
  requestAnimationFrame(nextFrame);
}

export function startProjectSlider() {
  const slide1 = document.querySelector<HTMLDivElement>(".slide1");
  const slide2 = document.querySelector<HTMLDivElement>(".slide2");
  const slide3 = document.querySelector<HTMLDivElement>(".slide3");
  const slide4 = document.querySelector<HTMLDivElement>(".slide4");

  slide1!.style.backgroundImage = "url(./img/1.jpg)";
  slide2!.style.backgroundImage = "url(./img/2.jpg)";
  slide3!.style.backgroundImage = "url(./img/3.jpg)";
  slide4!.style.backgroundImage = "url(./img/4.jpg)";

  const builder = new AnimationBuilder();
  builder
    .setTargets("slides", slide4!.style, slide2!.style, slide3!.style)
    .select("slides")
    .props<CSSStyleDeclaration>({
      opacity: "0",
    })
    .build().play();

    /*Timer.repeat(5000, () => {
      nextProjectSlide();
    });*/
}

let slider = 0;
export function nextProjectSlide() {
  const prev = document.querySelector<HTMLDivElement>(".slide" + (slider+1));
  slider = slider === 3 ? 0 : slider + 1;
  const next = document.querySelector<HTMLDivElement>(".slide" + (slider+1));

  new AnimationBuilder()
    .setTargets("prev", prev!.style)
    .setTargets("next", next!.style)
    .select("prev")
    .tween<CSSStyleDeclaration>({
      duration: 1000,
      easing: Easing.easeInOutCubic,
      props: {
        opacity: {
          from : 1,
          to   : 0,
        },
      }
    })
    .select("next")
    .tween<CSSStyleDeclaration>({
      duration: 1000,
      easing: Easing.easeInOutCubic,
      props: {
        opacity: {
          from : 0,
          to   : 1,
        },
      }
    })
  .build().play();
}

export function prevProjectSlide() {
  const prev = document.querySelector<HTMLDivElement>(".slide" + (slider+1));
  slider = slider === 0 ? 3 : slider - 1;
  const next = document.querySelector<HTMLDivElement>(".slide" + (slider+1));

  new AnimationBuilder()
    .setTargets("prev", prev!.style)
    .setTargets("next", next!.style)
    .select("prev")
    .tween<CSSStyleDeclaration>({
      duration: 1000,
      easing: Easing.easeInOutCubic,
      props: {
        opacity: {
          from : 1,
          to   : 0,
        },
      }
    })
    .select("next")
    .tween<CSSStyleDeclaration>({
      duration: 1000,
      easing: Easing.easeInOutCubic,
      props: {
        opacity: {
          from : 0,
          to   : 1,
        },
      }
    })
  .build().play();
}