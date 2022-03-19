(function (xterm) {
  'use strict';

  //import { Terminal } from "./node_modules/@altronix/xterm/xterm.js";

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

  var term = new xterm.Terminal({
    fontFamily: '"Cascadia Code", Menlo, monospace',
    theme: baseTheme,
    cursorBlink: true,
  });
  term.applyAddon(fullscreen);

  term.open(document.getElementById("terminal"));
  term.write(
    "Hey, Omkar here! I'm a backend engineer building performant, scalable software, and a hobbyist Front-end developer building sites like, well, this."
  );

})(xterm);
