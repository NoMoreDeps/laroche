"use strict";
/**
 * Part of Moon library under the MIT license
 */
/**
 * The following applies to all functions
 * t = time between 0 to duration
 * b = beginning value
 * c = change in value (ex: from 0 to 100, b = 0 / c = 100, from 200 to 250, b = 200/ c = 50)
 * d = duration
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.Easing = void 0;
// Linear motion
function easeLinear(t, b, c, d) {
    return c * t / d + b;
}
// Quadratic easing in
function easeInQuad(t, b, c, d) {
    return c * (t /= d) * t + b;
}
// Quadratic easing out
function easeOutQuad(t, b, c, d) {
    return -c * (t /= d) * (t - 2) + b;
}
// Quadratic easing in and out
function easeInOutQuad(t, b, c, d) {
    if ((t /= d / 2) < 1)
        return c / 2 * t * t + b;
    return -c / 2 * ((--t) * (t - 2) - 1) + b;
}
// Sinusoidal easing in
function easeInSine(t, b, c, d) {
    return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
}
// Sinusoidal easing out
function easeOutSine(t, b, c, d) {
    return c * Math.sin(t / d * (Math.PI / 2)) + b;
}
// Sinusoidal easing in and out
function easeInOutSine(t, b, c, d) {
    return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
}
// Exponential easing in
function easeInExpo(t, b, c, d) {
    return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
}
// Exponential easing out
function easeOutExpo(t, b, c, d) {
    return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
}
// Exponential easing in and out
function easeInOutExpo(t, b, c, d) {
    if (t == 0)
        return b;
    if (t == d)
        return b + c;
    if ((t /= d / 2) < 1)
        return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
    return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
}
// Circular easing in
function easeInCirc(t, b, c, d) {
    return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
}
// Circular easing out
function easeOutCirc(t, b, c, d) {
    return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
}
// Circular easing in and out
function easeInOutCirc(t, b, c, d) {
    if ((t /= d / 2) < 1)
        return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
    return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
}
// Cubic easing in
function easeInCubic(t, b, c, d) {
    return c * (t /= d) * t * t + b;
}
// Cubic easing out
function easeOutCubic(t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b;
}
// Cubic easing in and out
function easeInOutCubic(t, b, c, d) {
    if ((t /= d / 2) < 1)
        return c / 2 * t * t * t + b;
    return c / 2 * ((t -= 2) * t * t + 2) + b;
}
// Quartic easing in
function easeInQuart(t, b, c, d) {
    return c * (t /= d) * t * t * t + b;
}
// Quartic easing out
function easeOutQuart(t, b, c, d) {
    return -c * ((t = t / d - 1) * t * t * t - 1) + b;
}
// Quartic easing in and out
function easeInOutQuart(t, b, c, d) {
    if ((t /= d / 2) < 1)
        return c / 2 * t * t * t * t + b;
    return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
}
// Quintic easing in
function easeInQuint(t, b, c, d) {
    return c * (t /= d) * t * t * t * t + b;
}
// Quintic easing out
function easeOutQuint(t, b, c, d) {
    return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
}
// Quintic easing in and out
function easeInOutQuint(t, b, c, d) {
    if ((t /= d / 2) < 1)
        return c / 2 * t * t * t * t * t + b;
    return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
}
// Elastic easing in
function easeInElastic(t, b, c, d) {
    var s = 1.70158;
    var p = 0;
    var a = c;
    if (t == 0)
        return b;
    if ((t /= d) == 1)
        return b + c;
    if (!p)
        p = d * .3;
    if (a < Math.abs(c)) {
        a = c;
        var s = p / 4;
    }
    else
        var s = p / (2 * Math.PI) * Math.asin(c / a);
    return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
}
// Elastic easing out
function easeOutElastic(t, b, c, d) {
    var s = 1.70158;
    var p = 0;
    var a = c;
    if (t == 0)
        return b;
    if ((t /= d) == 1)
        return b + c;
    if (!p)
        p = d * .3;
    if (a < Math.abs(c)) {
        a = c;
        var s = p / 4;
    }
    else
        var s = p / (2 * Math.PI) * Math.asin(c / a);
    return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
}
// Elastic easing in and out
function easeInOutElastic(t, b, c, d) {
    var s = 1.70158;
    var p = 0;
    var a = c;
    if (t == 0)
        return b;
    if ((t /= d / 2) == 2)
        return b + c;
    if (!p)
        p = d * (.3 * 1.5);
    if (a < Math.abs(c)) {
        a = c;
        var s = p / 4;
    }
    else
        var s = p / (2 * Math.PI) * Math.asin(c / a);
    if (t < 1)
        return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
}
// Back easing in
function easeInBack(t, b, c, d) {
    const s = 1.70158;
    return c * (t /= d) * t * ((s + 1) * t - s) + b;
}
// Back easing out
function easeOutBack(t, b, c, d) {
    const s = 1.70158;
    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
}
// Back easing in and out
function easeInOutBack(t, b, c, d) {
    let s = 1.70158;
    if ((t /= d / 2) < 1)
        return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
    return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
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
