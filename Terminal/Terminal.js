"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Terminal = void 0;
const BaseTerminal_1 = require("./core/BaseTerminal");
const Constant_1 = require("./core/Constant");
const Constant_2 = require("./core/Constant");
class Terminal extends BaseTerminal_1.BaseTerminal {
    constructor() {
        super();
    }
    drawColoredText(text, foreColor = void 0, backColor = void 0) {
        foreColor && this._color(foreColor);
        backColor && this._color(backColor);
        this.text(text);
        backColor && this._color(Constant_2.endingBackColor);
        foreColor && this._color(Constant_2.endingForeColor);
        return this;
    }
    getAndClearBuffer() {
        const res = this._buffer;
        this.clearBuffer();
        return res;
    }
}
exports.Terminal = Terminal;
/**
 * Mixin for foreground and background colors
 */
for (let i in Constant_2.Color16) {
    Terminal.prototype[i] = function (text = "") {
        return text === "" ? this : this["_color"](Constant_2.ForeColor[Constant_2.Color16[i]])
            .text(text)["_color"](Constant_2.endingForeColor);
    };
    let j = i[0].toUpperCase() + i.substr(1);
    Terminal.prototype[`bg${j}`] = function (text = "") {
        return text === "" ? this : this["_color"](Constant_2.BackColor[Constant_2.Color16[i]])
            .text(text)["_color"](Constant_2.endingBackColor);
    };
}
/**
 * Mixin for styles
 */
for (let i in Constant_1.Styles) {
    Terminal.prototype[i] = function (text = "") {
        return text === "" ? this : this["_color"](Constant_1.Styles[i][0])
            .text(text)["_color"](Constant_1.Styles[i][1]);
    };
}
