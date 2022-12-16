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
export declare const EscOpeningChar: string;
export declare const EscPositionClosingChar: string;
export declare const EscColorClosingChar: string;
export declare const endingForeColor = 39;
export declare const endingBackColor = 49;
export declare const Styles: {
    bold: number[];
    dim: number[];
    italic: number[];
    underline: number[];
    inverse: number[];
    hidden: number[];
    strikethrough: number[];
};
export declare const ForeColor: number[];
export declare const BackColor: number[];
export interface IColorTerminalDelegate<T> {
    (text?: string): T;
}
export interface IColor16Terminal<T> {
    red: IColorTerminalDelegate<T>;
    black: IColorTerminalDelegate<T>;
    green: IColorTerminalDelegate<T>;
    yellow: IColorTerminalDelegate<T>;
    blue: IColorTerminalDelegate<T>;
    magenta: IColorTerminalDelegate<T>;
    cyan: IColorTerminalDelegate<T>;
    lightGray: IColorTerminalDelegate<T>;
    darkGray: IColorTerminalDelegate<T>;
    lightRed: IColorTerminalDelegate<T>;
    lightGreen: IColorTerminalDelegate<T>;
    lightYellow: IColorTerminalDelegate<T>;
    lightBlue: IColorTerminalDelegate<T>;
    lightMagenta: IColorTerminalDelegate<T>;
    lightCyan: IColorTerminalDelegate<T>;
    white: IColorTerminalDelegate<T>;
    bgRed: IColorTerminalDelegate<T>;
    bgBlack: IColorTerminalDelegate<T>;
    bgGreen: IColorTerminalDelegate<T>;
    bgYellow: IColorTerminalDelegate<T>;
    bgBlue: IColorTerminalDelegate<T>;
    bgMagenta: IColorTerminalDelegate<T>;
    bgCyan: IColorTerminalDelegate<T>;
    bgLightGray: IColorTerminalDelegate<T>;
    bgDarkGray: IColorTerminalDelegate<T>;
    bgLightRed: IColorTerminalDelegate<T>;
    bgLightGreen: IColorTerminalDelegate<T>;
    bgLightYellow: IColorTerminalDelegate<T>;
    bgLightBlue: IColorTerminalDelegate<T>;
    bgLightMagenta: IColorTerminalDelegate<T>;
    bgLightCyan: IColorTerminalDelegate<T>;
    bgWhite: IColorTerminalDelegate<T>;
}
export declare type Color16Type = {
    red: string;
    black: string;
    green: string;
    yellow: string;
    blue: string;
    magenta: string;
    cyan: string;
    lightGray: string;
    darkGray: string;
    lightRed: string;
    lightGreen: string;
    lightYellow: string;
    lightBlue: string;
    lightMagenta: string;
    lightCyan: string;
    white: string;
};
export declare type BgColor16Type = {
    bgRed: string;
    bgBlack: string;
    bgGreen: string;
    bgYellow: string;
    bgBlue: string;
    bgMagenta: string;
    bgCyan: string;
    bgLightGray: string;
    bgDarkGray: string;
    bgLightRed: string;
    bgLightGreen: string;
    bgLightYellow: string;
    bgLightBlue: string;
    bgLightMagenta: string;
    bgLightCyan: string;
    bgWhite: string;
};
export declare const Color16: {
    red: number;
    black: number;
    green: number;
    yellow: number;
    blue: number;
    magenta: number;
    cyan: number;
    lightGray: number;
    darkGray: number;
    lightRed: number;
    lightGreen: number;
    lightYellow: number;
    lightBlue: number;
    lightMagenta: number;
    lightCyan: number;
    white: number;
};
