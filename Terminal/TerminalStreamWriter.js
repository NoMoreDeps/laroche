"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TerminalStreamWriter = void 0;
const events_1 = require("events");
class TerminalStreamWriter extends events_1.EventEmitter {
    constructor(terminal) {
        super();
        this.curPosRegEx = /\[(?<row>[0-9]+);(?<col>[0-9]+)/;
        this.term = terminal;
    }
    write(...args) {
        if (this.curPosRegEx.test(args[0])) {
            const res = this.curPosRegEx.exec(args[0]);
            this.emit("onSavePos", {
                col: Number(res.groups.col),
                row: Number(res.groups.row)
            });
            return;
        }
        this.emit("write", args);
        if (args[0] === "\u0018") {
            this.src["setRawMode"](false);
            // console.log("End (press enter to exit)");
            process.stdin.removeAllListeners();
            process.stdin.unpipe(this);
            console.log("\n\nTerminated by user <ctrl+x>");
            process.exit(-1);
        }
        return true;
    }
    end(...args) {
        console.log("end", args);
    }
}
exports.TerminalStreamWriter = TerminalStreamWriter;
