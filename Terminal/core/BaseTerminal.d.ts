export const __esModule: boolean;
/**
 * Defines a base class for terminal shell
 * @class BaseTerminal
 * @abstract
 */
export class BaseTerminal extends events_1 {
    constructor();
    _x: number;
    _y: number;
    _savePos: {};
    _waitingPos: string;
    _buffer: string;
    _color(colorValue: any): BaseTerminal;
    _colorExt(colorValue: any): BaseTerminal;
    _bgColorExt(colorValue: any): BaseTerminal;
    /**
     *
     */
    set onWrite(arg: any);
    get onWrite(): any;
    _streamWriterDataEventHandler: any;
    /**
     * Resets all color settings
     * @method reset
     */
    reset(): BaseTerminal;
    clearTerminal(): BaseTerminal;
    /**
     * Draws a line onto the terminal
     * @method drawLine
     * @param {string} char
     */
    drawLine(char?: string, color?: string): BaseTerminal;
    to(col: any, row: any): BaseTerminal;
    row(row: any): BaseTerminal;
    col(col: any): BaseTerminal;
    pos(col: any, row: any): BaseTerminal;
    moveRowBy(value: any): BaseTerminal;
    moveColBy(value: any): BaseTerminal;
    ext(colorValue: any): BaseTerminal;
    bgExt(colorValue: any): BaseTerminal;
    text(object?: undefined): BaseTerminal;
    saveCursorPos(name: any, absolutePosition: any): Promise<any>;
    _waitingPosResolver: ((value: any) => void) | undefined;
    restoreCursorPosition(name: any): BaseTerminal;
    stringify(object: any): BaseTerminal;
    clear(): void;
    clearBuffer(): void;
    newLine(): BaseTerminal;
    writeLine(object?: undefined): BaseTerminal;
    write(object?: undefined): BaseTerminal;
    get rows(): number;
    get cols(): number;
    /**
     * Stops listening to inputs
     * This will unpipe the current stream and unregister all callbacks
     * @method stopListen
     * @return {void}
     */
    stopListen(): void;
    /**
     * Listen to inputs
     * By default it will start listening to inputs and let you get inputs by registering on write event.
     * You can set your own StreamWriter. In that case, the write event will not be fired
     * @method listenInputs
     * @param {boolean} rawMode If true the Terminal will listen Key data, otherwise string data
     */
    listenInputs(rawMode?: boolean, streamWriter?: undefined): void;
}
import events_1 = require("events");
