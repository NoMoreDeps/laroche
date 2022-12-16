const spawn = require('child_process').spawn;
const Terminal = require("./Terminal/index").Terminal;
const term = new Terminal();

function startChildProcess(name, color, command, ...args) {
  const childProcess = spawn(command, args, { cwd: process.cwd() });
  
  childProcess.stdout.setEncoding('utf8');
  childProcess.stderr.setEncoding('utf8');
  
  childProcess.stdout.on('data', function(data) {
    term.drawLine("-", color)
    [color](" ")
    [color](new Date().toLocaleTimeString())
    [color](" " + name).newLine()
    .text(data).writeLine();
  });
  
  childProcess.stderr.on('data', function(data) {
    term.drawLine("-", color)
    [color](" ")
    [color](new Date().toLocaleTimeString())
    [color](" " + name).newLine()
    .text(data).writeLine();
  });

  childProcess.on('close', function(code) {
      console.log('closing code: ' + code);
  });
}

startChildProcess("Bundler", "green", "node", "build-dev.js");
startChildProcess("Compiler", "blue", "cmd", "/k", "yarn", "tsc", "-w");