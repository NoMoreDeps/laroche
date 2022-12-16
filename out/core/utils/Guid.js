"use strict";
/**
* The MIT License (MIT)
* Copyright (c) <2016> <Beewix>
* Author <François Skorzec>
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Guid = void 0;
/**
 * Guid implementation based on Random generation (RFC V4)
 * @class Guid
 */
class Guid {
    static generate2bytesNumber() {
        const res = Math.round((Math.random() * 0xFFFF));
        return [res, Guid.pad(res.toString(16), 4)];
    }
    static generate4bytesNumber() {
        const res = Math.round((Math.random() * 0xFFFFFFFF));
        return [res, Guid.pad(res.toString(16), 8)];
    }
    static generate6bytesNumber() {
        const res = Math.round((Math.random() * 0xFFFFFFFFFFFF));
        return [res, Guid.pad(res.toString(16), 12)];
    }
    static pad(txt, size) {
        var pad = "";
        for (let i = 0; i < size; i++) {
            pad += "0";
        }
        return (pad + txt).substr(-size);
    }
    /**
     * @constructor
     */
    constructor() {
        const [part1, strPart1] = Guid.generate4bytesNumber();
        const [part2, strPart2] = Guid.generate2bytesNumber();
        const [part3, strPart3] = Guid.generate2bytesNumber();
        const [part4, strPart4] = Guid.generate2bytesNumber();
        const [part5, strPart5] = Guid.generate6bytesNumber();
        this._Guid_ = {
            part1: part1,
            part2: part2,
            part3: part3,
            part4: part4,
            part5: part5,
            toString: `${strPart1}-${strPart2}-${strPart3}-${strPart4}-${strPart5}`
        };
    }
    /**
     * Gets the part1
     */
    get part1() {
        return this._Guid_.part1;
    }
    /**
     * Gets the part2
     */
    get part2() {
        return this._Guid_.part2;
    }
    /**
     * Gets the part3
     */
    get part3() {
        return this._Guid_.part3;
    }
    /**
     * Gets the part 4
     */
    get part4() {
        return this._Guid_.part4;
    }
    /**
     * Gets the part 5
     */
    get part5() {
        return this._Guid_.part5;
    }
    /**
     * Gets a string representation of the Guid
     * @method toString
     * @return {string}
     */
    toString() {
        return this._Guid_.toString;
    }
    /**
     * Gets a string Guid without a Guid Object
     * @static
     * @method getGuid
     * @return {string}
     */
    static getGuid() {
        return new Guid().toString();
    }
}
exports.Guid = Guid;
