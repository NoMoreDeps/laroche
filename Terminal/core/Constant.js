"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Color16 = exports.BackColor = exports.ForeColor = exports.Styles = exports.endingBackColor = exports.endingForeColor = exports.EscColorClosingChar = exports.EscPositionClosingChar = exports.EscOpeningChar = void 0;
/**
 * The MIT License (MIT)
 * Copyright (c) <2016> <Beewix Interactive>
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
exports.EscOpeningChar = "\x1B[";
exports.EscPositionClosingChar = "H";
exports.EscColorClosingChar = "m";
exports.endingForeColor = 39;
exports.endingBackColor = 49;
exports.Styles = {
    bold: [1, 22],
    dim: [2, 22],
    italic: [3, 23],
    underline: [4, 24],
    inverse: [7, 27],
    hidden: [8, 28],
    strikethrough: [9, 29]
};
exports.ForeColor = [
    31,
    30,
    32,
    33,
    34,
    35,
    36,
    37,
    90,
    91,
    92,
    93,
    94,
    95,
    96,
    97
];
exports.BackColor = [
    41,
    40,
    42,
    43,
    44,
    45,
    46,
    47,
    100,
    101,
    102,
    103,
    104,
    105,
    106,
    107
];
exports.Color16 = {
    red: 0,
    black: 1,
    green: 2,
    yellow: 3,
    blue: 4,
    magenta: 5,
    cyan: 6,
    lightGray: 7,
    darkGray: 8,
    lightRed: 9,
    lightGreen: 10,
    lightYellow: 11,
    lightBlue: 12,
    lightMagenta: 13,
    lightCyan: 14,
    white: 15
};
