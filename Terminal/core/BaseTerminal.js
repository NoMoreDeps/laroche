"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseTerminal = void 0;
/**
 * The MIT License (MIT)
 * Copyright (c) <2016> <Beewix Interactive>
 * Author <François Skorzec>xxww
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy,
 * modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software
 * is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
 * BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT
 * OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
const Constant_1 = require("./Constant");
const TerminalStreamWriter_1 = require("../TerminalStreamWriter");
const events_1 = require("events");
/**
 * Defines a base class for terminal shell
 * @class BaseTerminal
 * @abstract
 */
class BaseTerminal extends events_1.EventEmitter {
    constructor() {
        super();
        this._x = 0;
        this._y = 0;
        this._savePos = {};
        this._waitingPos = "";
        this._buffer = "";
        process.stdin.setEncoding("utf8");
        this.on("write", (data) => {
            if (this._streamWriterDataEventHandler) {
                this._streamWriterDataEventHandler(data);
            }
        });
    }
    _color(colorValue) {
        this._buffer += `${Constant_1.EscOpeningChar}${colorValue}${Constant_1.EscColorClosingChar}`;
        return this;
    }
    _colorExt(colorValue) {
        this._buffer += `${Constant_1.EscOpeningChar}38;5;${colorValue}${Constant_1.EscColorClosingChar}`;
        return this;
    }
    _bgColorExt(colorValue) {
        this._buffer += `${Constant_1.EscOpeningChar}48;5;${colorValue}${Constant_1.EscColorClosingChar}`;
        return this;
    }
    /**
     *
     */
    set onWrite(value) {
        this._streamWriterDataEventHandler = value;
    }
    get onWrite() {
        return this._streamWriterDataEventHandler;
    }
    /**
     * Resets all color settings
     * @method reset
     */
    reset() {
        return this._color(0)._color(0);
    }
    clearTerminal() {
        process.stdout.write(`${Constant_1.EscOpeningChar}2J`);
        return this;
    }
    /**
     * Draws a line onto the terminal
     * @method drawLine
     * @param {string} char
     */
    drawLine(char = "", color = "text") {
        if (char === "") {
            char = " ";
        }
        if (typeof char === "string" && char.length > 1) {
            char = char.charAt(0);
        }
        let line = "";
        for (let i = 0; i < this.cols - 1; i++) {
            line += char;
        }
        //let old = this._buffer;
        this[color](line);
        //this._buffer = old;
        return this;
    }
    to(col, row) {
        this._buffer += `${Constant_1.EscOpeningChar}${row};${col}H`;
        return this;
    }
    row(row) {
        this._buffer += `${Constant_1.EscOpeningChar}${row}${Constant_1.EscPositionClosingChar}`;
        return this;
    }
    col(col) {
        this._buffer += `${Constant_1.EscOpeningChar};${col}${Constant_1.EscPositionClosingChar}`;
        return this;
    }
    pos(col,row) {
        return this.row(row).col(col);
    }
    moveRowBy(value) {
        this._buffer += `${Constant_1.EscOpeningChar}${Math.abs(value)}${value > 0 ? "A" : "B"}`;
        return this;
    }
    moveColBy(value) {
        this._buffer += `${Constant_1.EscOpeningChar}${Math.abs(value)}${value > 0 ? "C" : "D"}`;
        return this;
    }
    ext(colorValue) {
        return this._colorExt(colorValue);
    }
    bgExt(colorValue) {
        return this._bgColorExt(colorValue);
    }
    text(object = void 0) {
        if (!object) {
            return this;
        }
        this._buffer += object.toString();
        return this;
    }
    saveCursorPos(name, absolutePosition) {
        return new Promise(r => {
            this._waitingPos = name;
            this._waitingPosResolver = r;
            if (absolutePosition) {
                this.emit("onSavePos", {
                    col: Number(absolutePosition.col),
                    row: Number(absolutePosition.row)
                });
                return;
            }
            process.stdout.write(`${Constant_1.EscOpeningChar}6n`);
        });
    }
    restoreCursorPosition(name) {
        this.to(this._savePos[name].col, this._savePos[name].row);
        return this;
    }
    stringify(object) {
        this._buffer += JSON.stringify(object, null, 2);
        return this;
    }
    clear() {
        console.clear();
    }
    clearBuffer() {
        this._buffer = "";
    }
    newLine() {
        this._buffer += "\n";
        return this;
    }
    writeLine(object = void 0) {
        if (object !== void 0) {
            this.text(object);
        }
        console.log(this._buffer);
        this._buffer = "";
        return this;
    }
    write(object = void 0) {
        if (object !== void 0) {
            this.text(object);
        }
        process.stdout.write(this._buffer);
        this._buffer = "";
        return this;
    }
    get rows() {
        return process.stdout["rows"];
    }
    get cols() {
        return process.stdout["columns"];
    }
    /**
     * Stops listening to inputs
     * This will unpipe the current stream and unregister all callbacks
     * @method stopListen
     * @return {void}
     */
    stopListen() {
        process.stdin["setRawMode"](false);
        process.stdin.removeAllListeners();
        process.stdin.unpipe();
    }
    /**
     * Listen to inputs
     * By default it will start listening to inputs and let you get inputs by registering on write event.
     * You can set your own StreamWriter. In that case, the write event will not be fired
     * @method listenInputs
     * @param {boolean} rawMode If true the Terminal will listen Key data, otherwise string data
     */
    listenInputs(rawMode = false, streamWriter = void 0) {
        let stream = streamWriter ? streamWriter : new TerminalStreamWriter_1.TerminalStreamWriter(this);
        stream.on("write", (data) => {
            this.emit("write", data);
        });
        stream.on("onSavePos", (value) => {
            this._savePos[this._waitingPos] = value;
            this._waitingPos = "";
            this._waitingPosResolver();
        });
        stream.on("pipe", (src) => {
            stream.src = src;
            src["setRawMode"](rawMode);
        });
        process.stdin.pipe(stream);
    }
}
exports.BaseTerminal = BaseTerminal;
