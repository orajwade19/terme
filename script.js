//import { Terminal } from "./node_modules/@altronix/xterm/xterm.js";
//import * as XtermWebfont from "xterm-webfont";
//term.loadAddon(new XtermWebfont());

import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";

var baseTheme = {
  foreground: "#eff0eb",
  background: "#282a36",
  selection: "#97979b33",
  black: "#282a36",
  brightBlack: "#686868",
  red: "#ff5c57",
  brightRed: "#ff5c57",
  green: "#5af78e",
  brightGreen: "#5af78e",
  yellow: "#f3f99d",
  brightYellow: "#f3f99d",
  blue: "#57c7ff",
  brightBlue: "#57c7ff",
  magenta: "#ff6ac1",
  brightMagenta: "#ff6ac1",
  cyan: "#9aedfe",
  brightCyan: "#9aedfe",
  white: "#f1f1f0",
  brightWhite: "#eff0eb",
};

var term = new Terminal({
  fontFamily: '"Cascadia Code", Menlo, monospace',
  theme: baseTheme,
  cursorBlink: true,
});
const fitAddon = new FitAddon();
term.loadAddon(fitAddon);
term.open(document.getElementById("terminal"));

document.querySelector(".xterm").addEventListener("wheel", (e) => {
  if (term.buffer.active.baseY > 0) {
    e.preventDefault();
  }
});

function runFakeTerminal() {
  if (term._initialized) {
    return;
  }

  term._initialized = true;

  term.prompt = () => {
    term.write("\r\n$ ");
  };
}

term.write(
  " Hey,\x1b[34;1mOmkar\x1b[0m here! I'm a professional backend developer writing performant,\r\n scalable code And a hobbyist frontend developer!\r\n\n"
);

fitAddon.fit();

term.writeln("\t\tWant to know more? try running `\x1b[35;1mhelp\x1b[0m`.");
prompt(term);

term.onData((e) => {
  switch (e) {
    case "\u0003": // Ctrl+C
      term.write("^C");
      prompt(term);
      break;
    case "\r": // Enter
      runCommand(term, command);
      command = "";
      break;
    case "\u007F": // Backspace (DEL)
      // Do not delete the prompt
      if (term._core.buffer.x > 2) {
        term.write("\b \b");
        if (command.length > 0) {
          command = command.substr(0, command.length - 1);
        }
      }
      break;
    default:
      // Print all other characters for demo
      if (
        (e >= String.fromCharCode(0x20) && e <= String.fromCharCode(0x7b)) ||
        e >= "\u00a0"
      ) {
        command += e;
        term.write(e);
      }
  }
});

function prompt(term) {
  command = "";
  term.write("\r\n$ ");
}

var command = "";
var commands = {
  help: {
    f: () => {
      term.writeln(
        [
          "Welcome to my site! Try some of the commands below.",
          "",
          ...Object.keys(commands).map(
            (e) => `  ${e.padEnd(10)} ${commands[e].description}`
          ),
        ].join("\n\r")
      );
      prompt(term);
    },
    description: "Prints this help message",
  },

  surprise: {
    f: () => {
      window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
      term.prompt(term);
    },
    description: "Leads to a fun surprise!",
  },

  clear: {
    f: () => {
      term.clear();
      term.prompt(term);
    },
    description: "Clears the screen.",
  },

  aboutme: {
    f: () => {
      term.write(`Hey there, thanks for wanting to get to know me! I'm a software developer withabout 2 years of experience as a backend developer, and some familiarity with front end development as well! I'm constantly trying to learn more, so this   description might get old real fast. Other than this, I'm a fan of \uD83C\uDFC3 , \uD83C\uDFAE  and the strokes. Excited to hear from you at orajwade@gmail.com!
      `);
      term.prompt(term);
    },
    description: "Tells you a lil bit about me",
  },
};

function runCommand(term, text) {
  const command = text.trim().split(" ")[0];
  if (command.length > 0) {
    term.writeln("");
    if (command in commands) {
      commands[command].f();
      return;
    }
    term.writeln(
      `${command}: command not found. type 'help' to get a list of permitted commands!`
    );
  }
  prompt(term);
}

runFakeTerminal();
